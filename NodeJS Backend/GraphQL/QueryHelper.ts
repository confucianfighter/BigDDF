import {request} from 'graphql-request';
import * as QueryBuilder from './QueryBuilder';
import {Pool, PoolData} from "./Schema_Interfaces/Pool";
import {Token} from "./Schema_Interfaces/Token";
import {TokenHourData} from "./Schema_Interfaces/TokenHourData";
import {TokenDayData} from "./Schema_Interfaces/TokenDayData";
import {Block} from "./Schema_Interfaces/Block";
import {BlockHelper} from './BlockHelper';
import {getAllTokenPrices, ICoinGeckoMarkets, sortCoinGeckoBySymbol} from "./CoinGecko/CoinGecko";
import * as Timer from "../Utils/Timer";
import {TimeUnits} from "../Utils/TimeUtils";
import {timer} from "../Utils/Timer";

export type TokenHash = {
    [key: string]: Token;
};
export enum OrderDirection {
    desc = "desc",
    asc = "asc"
}
export class QueryHelper {
    // GraphQL provider url
    private provider_url: string = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
    // not sure if this need to be a singleton:
    private static Singleton:QueryHelper | null = null;
    //QueryHelper Constructor, if there is already one, returns that instead:
    constructor(provider_url:string = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3') {
        if(QueryHelper.Singleton === null){
            this.provider_url = provider_url;
            QueryHelper.Singleton = this;
        }
        return QueryHelper.Singleton;
    }
    // Sends whatever raw GraphQL query string you give it:
    public async sendQuery<T>(query_str:string, provider_url= this.provider_url): Promise<T> {
        const result = await request(provider_url, query_str)
            .then((result) => {
                return result
            })
        return result;
    }
    /* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
    public async getPools(first: number, orderBy:string, orderDirection:OrderDirection ): Promise<Pool[]>
    {
        interface PoolsResponse { pools:PoolData[]}
        // Gonna call a bunch of async functions, without using await,
        // stuff them into a list called promises and then wait until they are all filled:
        let promises: Promise<PoolsResponse>[] = []
        // 'first' is the variable passed into the query, like first: 10, first: 100 etc
        // it normally can only go to 1000.
        let blocks:Block[] = await new BlockHelper().getBlocks(1);
        let first_count_down:number = first;
        let i:number = 0;
        while(first_count_down > 0) {
            // take the next 1000 unless there's only a few left:
            const adjusted_first = first_count_down < 1000? first_count_down: 1000;
            // going a thousand at a time, skip is another GraphQL query parameter:
            const skip_amount = 1000 * i;
            // generate a graphql query string:
            const query_str:string = QueryBuilder.Pools(adjusted_first, skip_amount, orderBy, orderDirection, undefined, blocks[0].number);
            // send the query, store the promise, don't wait, move on
            promises.push(this.sendQuery<PoolsResponse>(query_str));
            // if this results in a negative number, we are done:
            first_count_down -= 1000;
            i++;
        }
        // Wait for all query results, build a pool list out of them:
        let pool_list:Pool[] = []
        let results = await Promise.all(promises);
        for (let result of results) {
            for(let poolData of result.pools)
            {
                let pool:Pool = new Pool(poolData);
                pool_list = [...pool_list, pool];
            }
        }
        return pool_list;
    }

    public async getPoolsThatMatchCoinGecko(first:number,
    orderBy:string,
    direction:OrderDirection = OrderDirection.desc,
    ):Promise<Pool[]>{
        let return_pools:Pool[] = [];
        let pools = await this.getPools(first, orderBy, direction);
        let coins: ICoinGeckoMarkets[] = await getAllTokenPrices(first);
        coins = coins.sort(sortCoinGeckoBySymbol);
        pools = pools.sort(this.sort_pools_by_token0_symbol);
        let last_coin_symbol:string = "";
        for(let coin of coins)
        {
            if(last_coin_symbol !== null)
            {
                if(last_coin_symbol === coin.symbol)
                {
                    continue;
                }
            }
            last_coin_symbol = coin.symbol;
            for(let pool of pools)
            {
                if(pool.token0?.symbol.toUpperCase() === coin.symbol.toUpperCase())
                {
                    return_pools.push(pool);
                }
            }
        }
        pools = pools.sort(this.sort_pools_by_token1_symbol);
        for(let pool of pools)
        {
            for(let coin of coins)
            {
                if(pool.token0?.symbol.toUpperCase() === coin.symbol.toUpperCase())
                {
                    coins.pop();
                    return_pools.push(pool);
                }
            }
        }
        return return_pools;
    }
    private sort_pools_by_token0_symbol(a:Pool, b:Pool)
    {
        if(a.token0.symbol > b.token0.symbol) return 1;
        else if(a.token0.symbol < b.token0.symbol) return -1;
        else return 0;
    }
    private sort_pools_by_token1_symbol(a:Pool, b:Pool)
    {
        if(a.token0.symbol > b.token0.symbol) return 1;
        else if(a.token0.symbol < b.token0.symbol) return -1;
        else return 0;


    }
    /* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
    public async getTokens(first: number, orderBy:string, orderDirection:OrderDirection ): Promise<Token[]>
    {
        interface TokenData { tokens: Token[]}
        // Gonna call a bunch of async functions, without using await,
        // stuff them into a list called promises and then wait until they are all filled:
        let blocks:Block[] = await new BlockHelper().getBlocks(1);
        timer.start("getTokens");
        let promises: Promise<TokenData>[] = []
        // 'first' is the variable passed into the query, like first: 10, first: 100 etc
        // it normally can only go to 1000.
        let first_count_down:number = first;
        let i:number = 0;
        while(first_count_down > 0) {
            // take the next 1000 unless there's only a few left:
            const adjusted_first = first_count_down < 1000? first_count_down : 1000;
            // going a thousand at a time, skip is another GraphQL query parameter:
            const skip_amount = 1000 * i;
            // generate a graphql query string:
            const query_str:string = QueryBuilder.Tokens(adjusted_first, skip_amount, orderBy, orderDirection, undefined, blocks[0].number);
            // send the query, store the promise, don't wait, move on
            promises.push(this.sendQuery<TokenData>(query_str));
            // if this results in a negative number, we are done:
            first_count_down -= 1000;
            i++;
        }
        // Wait for all query results, build a pool list out of them:
        let token_list:Token[] = []
        let results = await Promise.all(promises);
        for (let result of results) token_list = [...token_list, ...result.tokens];
        timer.stop();
        return token_list;
    }
    public async getTokenNameHash(first:number, orderBy:string, direction = OrderDirection.desc):Promise<TokenHash>
    {
        let tokenHash:TokenHash = {};
        let tokens = await this.getTokens(first,orderBy,direction);
        timer.start("Just making the token hash", TimeUnits.seconds);
        for(let token of tokens)
        {
            tokenHash[token.symbol.toUpperCase()] = token;
        }
        timer.stop();
        return tokenHash;
    }
    public async getTokenDayData(
    first: number,
    orderBy:string,
    orderDirection:OrderDirection ): Promise<TokenDayData[]> {
        interface TokenDay { tokenDayDatas:TokenDayData[]}
        // Gonna call a bunch of async functions, without using await,
        // stuff them into a list called promises and then wait until they are all filled:
        let promises: Promise<TokenDay>[] = [];
        let blocks:Block[] = await new BlockHelper().getBlocks(1);
        // 'first' is the variable passed into the query, like first: 10, first: 100 etc
        // it normally can only go to 1000.
        let first_count_down:number = first;
        let i:number = 0;
        while(first_count_down > 0) {
            // take the next 1000 unless there's only a few left:
            const adjusted_first = first_count_down < 1000? first_count_down: 1000;
            // going a thousand at a time, skip is another GraphQL query parameter:
            const skip_amount = 1000 * i;
            // generate a graphql query string:
            const query_str:string =
                QueryBuilder.TokenDayDatas(adjusted_first, skip_amount,orderBy,orderDirection, undefined, blocks[0].number)
            // send the query, store the promise, don't wait, move on
            promises.push(this.sendQuery<TokenDay>(query_str));
            // if this results in a negative number, we are done:
            first_count_down -= 1000;
            i++;
        }
        // Wait for all query results, build a pool list out of them:
        let tokenDayDatas: TokenDayData[] = []
        let results = await Promise.all(promises);
            for (let result of results) tokenDayDatas = [...tokenDayDatas, ...result.tokenDayDatas];
        return tokenDayDatas;
    }

    public async getTokenHourData(
        first: number,
        orderBy:string,
        orderDirection:OrderDirection ): Promise<TokenHourData[]> {
        interface TokenHourResponse { tokenHourDatas:TokenHourData[]}
        // Gonna call a bunch of async functions, without using await,
        // stuff them into a list called promises and then wait until they are all filled:
        let promises: Promise<TokenHourResponse>[] = []
        // 'first' is the variable passed into the query, like first: 10, first: 100 etc
        // it normally can only go to 1000.
        let blocks:Block[] = await new BlockHelper().getBlocks(1);
        let first_count_down:number = first;
        let i:number = 0;
        while(first_count_down > 0) {
            // take the next 1000 unless there's only a few left:
            const adjusted_first = first_count_down < 1000? first_count_down: 1000;
            // going a thousand at a time, skip is another GraphQL query parameter:
            const skip_amount = 1000 * i;
            // generate a graphql query string:
            // @ts-ignore
            let block = blocks[0].number -1;
            const query_str:string =
                QueryBuilder.TokenHourDatas(adjusted_first, skip_amount,orderBy,orderDirection, undefined, block)
            // send the query, store the promise, don't wait, move on
            promises.push(this.sendQuery<TokenHourResponse>(query_str));
            // if this results in a negative number, we are done:
            first_count_down -= 1000;
            i++;
        }
        // Wait for all query results, build a pool list out of them:
        let tokenHourDatas: TokenHourData[] = []
        let results = await Promise.all(promises);
        for (let result of results) tokenHourDatas = [...tokenHourDatas, ...result.tokenHourDatas];

        return tokenHourDatas;
    }

    /* Returns id list of all pools with specified coin name pair.
     */
    public async getPoolByTokenMatch(symbol_list: string[], first:number): Promise<Pool[]> {
        const result:Pool[] = await this.getPools(first,'volumeUSD', OrderDirection.desc);
        let match_list: Pool[] = [];
        for (let i: number = 0; i < result.length; i++) {
            const pool:Pool = result[i];
            if (pool.token0?.symbol === symbol_list[0] || pool.token0?.symbol === symbol_list[1]) {
                if (pool.token1?.symbol === symbol_list[0] || pool.token1?.symbol === symbol_list[1]) {
                    match_list.push(pool);
                }
            }
        }
        return match_list;
    }

    // Gets Pool IDs as a list of strings
    public getIDsFromPoolList(pools:Pool[]):string[]
    {
        let ids:string[] = [];
        for(let pool of pools){
            ids = [...ids, <string>pool['id']]
        }
        return ids
    }
    /*Runs a pool query from a list of ids
    * can only run 100 at a time, so if there's more than 100,
    * this runs them all at once:*/
    public async getPoolsByID(ids_list:string[]): Promise<Pool[]> {
        interface PoolsResponse {pools:Pool[]}
        let ids: string[] = [...ids_list]
        let blocks:Block[] = await new BlockHelper().getBlocks(1);
        let result_list:Pool[] = []
        let promises:Promise<PoolsResponse>[] = []
        while (ids.length > 0) {
            // I'd use array.splice, but I'm Array retarded.
            let splice_amount = ids.length >= 20? 20:ids.length;
            let ids_fragment :string[] = []
            for(let i = 0; i < splice_amount; i++) {
                // @ts-ignore // ts complains pop could return undefined
                let id: string = ids.pop();
                ids_fragment.push(id);
            }
            let query_str: string = QueryBuilder.Pools(undefined, undefined,undefined, undefined, ids_fragment, blocks[0].number);
            // take the promise, don't wait
            promises.push(this.sendQuery<PoolsResponse>(query_str));
        }
        // now wait for all queries to finish and build the pools list:
        let results = await Promise.all(promises);
        for(let pool of results){
            // ... is called the spreader operator, just unpacks the list
            result_list = [...result_list, ...pool.pools]
        }
        //make sure everything matches:
        await this.verifyAllIDsPresent(ids, result_list)
        return result_list;
    }
    /* goes through id list and list of pools and makes sure it all matches*/
    async verifyAllIDsPresent(ids:string[], pools:Pool[])
    {
        let ids_copy = [...ids]
        ids_copy = ids_copy.sort(this.sort_ids_func );
        let pools_copy = [...pools];
        pools_copy = pools_copy.sort(this.sort_pools_by_id_func);
        for(let i = 0; i < ids_copy.length; i++){
            let list_id = ids_copy[i]
            let pool_id = pools_copy[i]['id'];
            if( list_id !== pool_id){
                throw new Error("Failed to fetch all ids.");
            }
        }
        console.log("Query fetched all ids correctly.")
    }
    // sort function that sorts string guids
    private sort_ids_func(aID:string,bID:string){
        let aNum:Number = parseInt(aID,16);
        let bNum:Number = parseInt(bID, 16);
        if(aNum > bNum) return 1;
        if(aNum < bNum) return -1;
        else return 0;
    }
    // same as above but id string is in an object:
    public sort_pools_by_id_func(a:Pool,b:Pool){
        // convert to hex to make sure we are dealing with actual ids.
        let aID = <string>a['id'];
        let bID = <string>b['id'];
        let aNum:Number = parseInt(aID,16);
        let bNum:Number = parseInt(bID, 16);
        if(aNum > bNum) return 1;
        if(aNum < bNum) return -1;
        else return 0;
    }
    // compiler won't recognize this function. Help!
    public isHexID(hex_str: string) {
        // take the 0x off the front:
        hex_str = hex_str.substring(2);
        // Regex that matches a hex string of 40 characters
        let re = /[0-9A-Fa-f]{40}/g
        // run the regex:
        if(!re.test(hex_str)) {
            throw new Error("String passed in is not in hex and is probably not a valid id");
        }
    }
}