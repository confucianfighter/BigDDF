import {OrderDirection, QueryHelper} from '../GraphQL/QueryHelper'
import {readFile, readFileSync, writeFileSync} from 'fs';
import * as path from "path";
import {Pool} from "../Exchanges/UniswapV3/Pools/Pool";
import {getPools} from "../Exchanges/UniswapV3/Pools/Pools";
export class Database {
    private static Singleton: Database | null = null;
    public CurrentPrices: object[] | null = null;
    public MarkedPrices: object[] | null = [];

    private q = new QueryHelper();

    constructor() {
        if(Database.Singleton === null) {
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
        let q_result:Pool[] = await getPools(first, orderBy, OrderDirection.desc);
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
    async loadMarkedPrices(): Promise<Pool[]>
    {
        let loaded_string:string | null = null;
        let data = readFileSync('/Users/daylannance/Documents/uniswap-getting-started/Database/MarkedPrices.json',
            'utf8');
        this.MarkedPrices = Object(await JSON.parse(data));
        return <Pool[]>this.MarkedPrices;
    }
}
