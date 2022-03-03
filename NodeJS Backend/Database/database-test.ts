import {Database} from "./database";
import {QueryHelper} from "../GraphQL/QueryHelper";
import {Pool} from "../Exchanges/UniswapV3/Pools/Pool";
import {getIDsFromPoolList, getPoolsByID} from "../Exchanges/UniswapV3/Pools/Pools";
import {} from "./postgres";

async function test()
{
    let database = new Database();
}

test();