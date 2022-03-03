import {Pool} from "./Pool";
import {OrderDirection, QueryHelper} from "../../../GraphQL/QueryHelper";
import {getIDsFromPoolList, getPools, getPoolsByID, sort_pools_by_id_func} from "./Pools";
import {Timer} from "../../../Utils/Timer";

export async function test(verbose = false){
    console.log(`Starting Pools test:`)
    let get_pools_timer = new Timer(); get_pools_timer.start();
    let first = 5000;
    let pools = await getPools(first, 'volumeUSD',OrderDirection.desc);
    const message =
        `   Asked Pools.getPools for ${first} pools and got back ${pools.length}.`
    if(pools.length !== first)  throw new Error(message);
    else(console.log(message + " Looks Good!"));
    get_pools_timer.stop(`Pools.getPools(${first})`);
    if(verbose) console.log(pools);
    console.log(`   ...Finished Pools test.`);
}

async function testGetPoolsByID(pools:Pool[]): Promise<Pool[]>
{
    const qh = new QueryHelper();
    let id_list = getIDsFromPoolList(pools);
    let fetched_pools:Pool[] = await getPoolsByID(id_list);
    //console.log("id_list: " + "\n" +
    //    id_list + "\n" +
    //    "fetched_pools:" + '\n' );
    //console.log(fetched_pools);
    console.log("Pools length is: " + fetched_pools.length);
    return fetched_pools;
}

async function testGetPools(first: number, orderBy:string, direction:OrderDirection)
{
    let data:Pool[] = await getPools(first, orderBy, direction);
    for(let pool of data)
    {
        console.log(pool.print());
    }
}

async function checkForDuplicatesById(list:Pool[]): Promise<void>
{
    let duplicates_found:Boolean = false;
    let list_copy = [...list];

    list_copy = list_copy.sort(sort_pools_by_id_func);
    //length must be 2 or greater because we are popping and comparing
    while(list_copy.length > 1)
    {
        const item = <Pool>list_copy.pop();
        // item shouldn't be null, compiler keeps complaining though
        if(item['id'] === list_copy[list_copy.length -1]['id']){
            duplicates_found = true;
            throw new Error("Found duplicates ids in list. Something may or may not be wrong with that.");
        }
    }
    if(!duplicates_found) console.log('No duplicate pool ids found.');

}