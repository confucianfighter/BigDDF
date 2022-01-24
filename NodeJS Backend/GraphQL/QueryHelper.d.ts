import { Pool } from "./Schema_Interfaces/Pool";
import { TokenHourData } from "./Schema_Interfaces/TokenHourData";
import { TokenDayData } from "./Schema_Interfaces/TokenDayData";
export declare enum OrderDirection {
    desc = "desc",
    asc = "asc"
}
export declare class QueryHelper {
    private provider_url;
    private static Singleton;
    constructor(provider_url?: string);
    sendQuery<T>(query_str: string): Promise<T>;
    getPools(first: number, orderBy: string, orderDirection: OrderDirection): Promise<Pool[]>;
    getTokens(first: number, orderBy: string, orderDirection: OrderDirection): Promise<object[]>;
    getTokenDayData(first: number, orderBy: string, orderDirection: OrderDirection): Promise<TokenDayData[]>;
    getTokenHourData(first: number, orderBy: string, orderDirection: OrderDirection): Promise<TokenHourData[]>;
    getPoolByTokenMatch(symbol_list: string[], first: number): Promise<Pool[]>;
    getIDsFromPoolList(query_obj: object[]): string[];
    getPoolsByID(ids_list: string[]): Promise<Pool[]>;
    verifyAllIDsPresent(ids: string[], pools: object[]): Promise<void>;
    private sort_ids_func;
    sort_pools_by_id_func(a: object, b: object): 0 | 1 | -1;
    isHexID(hex_str: string): void;
}
