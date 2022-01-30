import {Database} from "./database";
import {QueryHelper} from "../GraphQL/QueryHelper";
import {Pool} from "../GraphQL/Schema_Interfaces/Pool";

async function test()
{
    let database = new Database();
    console.log(database.MarkedPrices);
    let loaded_pools:Pool[] = await database.loadMarkedPrices();
    console.log(loaded_pools);
    let qh = new QueryHelper();
    let id_list = qh.getIDsFromPoolList(loaded_pools);
    let fetched_pools = qh.getPoolsByID(id_list);
}

test();