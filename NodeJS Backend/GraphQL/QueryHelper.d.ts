export declare enum OrderDirection {
    desc = "desc",
    asc = "asc"
}
export declare class QueryHelper {
    private provider_url;
    private static Singleton;
    constructor(provider_url?: string);
    sendQuery<T>(query_str: string, provider_url?: string): Promise<T>;
    isHexID(hex_str: string): void;
}
export declare let queryHelper: QueryHelper;
