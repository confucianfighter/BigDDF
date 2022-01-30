import { Pool } from "../Exchanges/UniswapV3/Pools/Pool";
export declare class Database {
    private static Singleton;
    CurrentPrices: object[] | null;
    MarkedPrices: object[] | null;
    private q;
    constructor();
    updateCurrentPrices(first: number, orderBy: string): Promise<Object>;
    markAllPrices(first: number, orderBy: string): Promise<Object[]>;
    private makePriceList;
    storeMarkedPrices(): Promise<void>;
    loadMarkedPrices(): Promise<Pool[]>;
}
