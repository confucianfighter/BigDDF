import { Pool } from "./Schema_Interfaces/Pool";
import { Token } from "./Schema_Interfaces/Token";
import { TokenHourData } from "./Schema_Interfaces/TokenHourData";
import { TokenDayData } from "./Schema_Interfaces/TokenDayData";
export declare type TokenHash = {
    [key: string]: Token;
};
export declare enum OrderDirection {
    desc = "desc",
    asc = "asc"
}
export declare class QueryHelper {
    private provider_url;
    private static Singleton;
    constructor(provider_url?: string);
    sendQuery<T>(query_str: string, provider_url?: string): Promise<T>;
    getPools(first: number, orderBy: string, orderDirection: OrderDirection): Promise<Pool[]>;
    getPoolsThatMatchCoinGecko(first: number, orderBy: string, direction?: OrderDirection): Promise<Pool[]>;
    private sort_pools_by_token0_symbol;
    private sort_pools_by_token1_symbol;
    getTokens(first: number, orderBy: string, orderDirection: OrderDirection): Promise<Token[]>;
    getTokenNameHash(first: number, orderBy: string, direction?: OrderDirection): Promise<TokenHash>;
    getTokenDayData(first: number, orderBy: string, orderDirection: OrderDirection): Promise<TokenDayData[]>;
    getTokenHourData(first: number, orderBy: string, orderDirection: OrderDirection): Promise<TokenHourData[]>;
    getPoolByTokenMatch(symbol_list: string[], first: number): Promise<Pool[]>;
    getIDsFromPoolList(pools: Pool[]): string[];
    getPoolsByID(ids_list: string[]): Promise<Pool[]>;
    verifyAllIDsPresent(ids: string[], pools: Pool[]): Promise<void>;
    private sort_ids_func;
    sort_pools_by_id_func(a: Pool, b: Pool): 0 | 1 | -1;
    isHexID(hex_str: string): void;
}
