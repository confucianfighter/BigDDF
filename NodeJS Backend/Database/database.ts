import {OrderDirection, QueryHelper} from '../GraphQL/QueryHelper'
import {readFile, readFileSync, writeFileSync} from 'fs';
import * as path from "path";
export class Database {
    private static Singleton: Database | null = null;
    public CurrentPrices: object[] | null = null;
    public MarkedPrices: object[] | null = [];
    public someOtherPrices: object[] | null;
    first: number;
    orderBy: string;
    private q = new QueryHelper();

    constructor() {
        if(Database.Singleton === null) {
            this.someOtherPrices = [];
            Database.Singleton = this;
        }
        return Database.Singleton;
    }

    async updateCurrentPrices(first: number, orderBy: string): Promise<Object> {
        this.CurrentPrices = await this.makePriceList(first, orderBy);
        return this.CurrentPrices;
    }
    async markAllPrices(first:number, orderBy: string): Promise<Object[]> {
        this.MarkedPrices = await this.makePriceList(first, orderBy);
        return this.MarkedPrices;
    }
    private async makePriceList(first:number, orderBy:string):Promise<object[]>
    {
        let q_result = await this.q.getPools(first, orderBy, OrderDirection.desc);
        let prices:object[] = [];
        for(let pool of q_result)
        {
            prices = [...prices, { ...pool, timestamp: new Date()}]
        }
        return prices;
    }
    async storeMarkedPrices()
    {
        writeFileSync(path.resolve("./", 'MarkedPrices.json'), JSON.stringify(this.MarkedPrices));
    }
    async loadMarkedPrices(): Promise<object[]>
    {
        let loaded_string:string | null = null;
        let data = readFileSync('/Users/daylannance/Documents/uniswap-getting-started/Database/MarkedPrices.json',
            'utf8');
        this.MarkedPrices = Object(await JSON.parse(data));
        // @ts-ignore
        return this.MarkedPrices;
    }
}
