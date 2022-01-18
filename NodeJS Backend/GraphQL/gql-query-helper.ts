import { request } from 'graphql-request';
import {pools_query, poolsByIDQuery} from './all-queries';

export enum OrderDirection {
    desc = "desc",
    asc = "asc"
}
export class QueryHelper {
    // GraphQL provider url
    private provider_url: string;
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
    public async sendQuery(query_str:string): Promise<object> {
        const result = await request(this.provider_url, query_str)
            .then((result) => {
                return result
            })
        return result;
    }

    /* Returns id list of all pools with specified coin name pair.
     */
    public async getPoolIdByCoinMatch(symbol_list: string[], first:number): Promise<object[]> {
        const result:object[] = await this.getPools(first,'liquidity', OrderDirection.desc)
        let match_list: object[] = [];
        for (let i: number = 0; i < result.length; i++) {
            const pool:object = result[i];
            if (pool['token0']['symbol'] === symbol_list[0] || pool['token0']['symbol'] === symbol_list[1]) {
                if (pool['token1']['symbol'] === symbol_list[0] || pool['token1']['symbol'] === symbol_list[1]) {
                    match_list.push(pool);
                }
            }
        }
        return match_list;
    }
    /* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
    public async getPools(first: number, orderBy:string, orderDirection:OrderDirection ): Promise<object[]>
    {
        // Gonna call a bunch of async functions, without using await,
        // stuff them into a list called promises and then wait until they are all filled:
        let promises: Promise<object>[] = []
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
            const query_str:string = pools_query(adjusted_first, skip_amount, orderBy, orderDirection);
            // send the query, store the promise, don't wait, move on
            promises.push(this.sendQuery(query_str));
            // if this results in a negative number, we are done:
            first_count_down -= 1000;
            i++;
        }
        // Wait for all query results, build a pool list out of them:
        let pool_list:object[] = []
        await Promise.all(promises).then((results:object[]) => {
            for (let result of results) pool_list = [...pool_list, ...result['pools']];
        })
        return pool_list;
    }
    // Gets Pool IDs as a list of strings
    public getIDsFromPoolList(query_obj:object[]):string[]
    {
        let ids:string[] = []
        for(let pool of query_obj){
            ids = [...ids, pool['id']]
        }
        return ids
    }
    /*Runs a pool query from a list of ids
    * can only run 100 at a time, so if there's more than 100,
    * this runs them all at once:*/
    public async getPoolsByID(ids_list:string[]): Promise<object[]> {
        let ids: string[] = [...ids_list]
        let result_list:object[] = []
        //
        let promises:Promise<object>[] = []
        while (ids.length > 0) {
            // I'd use array.splice, but I'm Array retarded.
            let splice_amount = ids.length >= 100? 100:ids.length;
            let ids_fragment :string[] = []
            for(let i = 0; i < splice_amount; i++){
                // @ts-ignore // ts complains pop could return undefined
                let id:string = ids.pop();
                ids_fragment.push(id);
            }
            let query_str: string = poolsByIDQuery(ids_fragment);
            // take the promise, don't wait
            promises.push(this.sendQuery(query_str));
        }
        // now wait for all queries to finish and build the pools list:
        await Promise.all(promises).then(results => {
            for(let pool of results){
                // ... is called the spreader operator, just unpacks the list
                result_list = [...result_list, pool['pools']]
            }
        });
        //make sure everything matches:
        await this.verifyAllIDsPresent(ids, result_list)
        return result_list;
    }
    /* goes through id list and list of pools and makes sure it all matches*/
    async verifyAllIDsPresent(ids:string[], pools:object[])
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
    public sort_pools_by_id_func(a:object,b:object){
        // convert to hex to make sure we are dealing with actual ids.
        let aID: string = a['id'];
        let bID: string = b['id'];
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
        // Regex that matches a hex string of 40 character
        let re = /[0-9A-Fa-f]{40}/g
        // run the regex:
        if(!re.test(hex_str)) {
            throw new Error("String passed in is not in hex and is probably not a valid id");
        }
    }
}
