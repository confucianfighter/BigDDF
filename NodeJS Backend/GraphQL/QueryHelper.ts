import {request} from 'graphql-request';
import * as QueryBuilder from './QueryBuilder';
import {Pool, PoolData} from "../Exchanges/UniswapV3/Pools/Pool";
import {IToken} from "../Exchanges/UniswapV3/Tokens/IToken";
import {TokenHourData} from "../Exchanges/UniswapV3/TokenHourDatas/TokenHourData";
import {TokenDayData} from "../Exchanges/UniswapV3/TokenDayDatas/TokenDayData";
import {Block} from "./Blocks/Block";
import {BlockHelper} from './Blocks/BlockHelper';
import {getAllTokenPrices, ICoinGeckoMarkets, sortCoinGeckoBySymbol} from "../CoinGecko/CoinGecko";
import {timer} from "../Utils/Timer";
import {TimeUnits} from "../Utils/TimeUtils";
import {TokenHash} from "../Exchanges/UniswapV3/Tokens/Tokens";
import {getPools} from "../Exchanges/UniswapV3/Pools/Pools";

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

export let queryHelper = new QueryHelper();