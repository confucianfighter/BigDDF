export declare class Database {
    private static Singleton;
    CurrentPrices: object[] | null;
    MarkedPrices: object[] | null;
    someOtherPrices: object[] | null;
    first: number;
    orderBy: string;
    private q;
    constructor();
    updateCurrentPrices(first: number, orderBy: string): Promise<Object>;
    markAllPrices(first: number, orderBy: string): Promise<Object[]>;
    private makePriceList;
    storeMarkedPrices(): Promise<void>;
    loadMarkedPrices(): Promise<object[]>;
}
