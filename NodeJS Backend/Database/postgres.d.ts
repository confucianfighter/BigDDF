import { Pool, Client, QueryResult } from 'pg';
export declare let POOL: Pool | null;
export declare let CLIENT: Client | null;
export declare type VIA = "CLIENT" | "POOL";
export declare function initializeDDFDatabase(): Promise<void>;
export declare function sendSQLQuery(query_str: string, via?: VIA): Promise<QueryResult | undefined>;
export declare function connectViaClient(): Promise<Client>;
