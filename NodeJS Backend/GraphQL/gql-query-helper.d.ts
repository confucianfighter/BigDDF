export declare enum OrderDirection {
    desc = "desc",
    asc = "asc"
}
export declare class QueryHelper {
    private provider_url;
    private static Singleton;
    constructor(provider_url?: string);
    sendQuery(query_str: string): Promise<object>;
    getPoolIdByCoinMatch(symbol_list: string[], first: number): Promise<object[]>;
    getPools(first: number, orderBy: string, orderDirection: OrderDirection): Promise<object[]>;
    getIDsFromPoolList(query_obj: object[]): string[];
    getPoolsByID(ids_list: string[]): Promise<object[]>;
    verifyAllIDsPresent(ids: string[], pools: object[]): Promise<void>;
    private sort_ids_func;
    sort_pools_by_id_func(a: object, b: object): 1 | -1 | 0;
    isHexID(hex_str: string): void;
}
