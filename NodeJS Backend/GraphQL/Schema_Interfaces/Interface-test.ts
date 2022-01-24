import {Pool} from './Pool'
import {OrderDirection, QueryHelper} from '../QueryHelper'

async function test()
{
    //const query_str:string =  pools_query(1,0,'volumeUSD', OrderDirection.desc);
    let qh:QueryHelper = new QueryHelper();
    let query_result = await qh.getPools(2,'volumeUSD', OrderDirection.desc);
    let pool:Pool = query_result[0];
    console.log("Collected fees " + pool.collectedFeesToken0);
    console.log(pool);
}

test();
