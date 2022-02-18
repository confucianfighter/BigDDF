import {Database} from "./database";
import {QueryHelper} from "../GraphQL/QueryHelper";
import {Pool} from "../Exchanges/UniswapV3/Pools/Pool";
import {getIDsFromPoolList, getPoolsByID} from "../Exchanges/UniswapV3/Pools/Pools";

async function test()
{
    let database = new Database();
    console.log(database.MarkedPrices);
    let loaded_pools:Pool[] = await database.loadMarkedPrices();
    console.log(loaded_pools);
    let qh = new QueryHelper();
    let id_list = getIDsFromPoolList(loaded_pools);
    let fetched_pools = getPoolsByID(id_list);
}

test();