import {Pool} from "./Pool";
import {OrderDirection, queryHelper, QueryHelper} from "../../../GraphQL/QueryHelper";
import {getIDsFromPoolList, getPools, getPoolsByID, sort_pools_by_id_func} from "./Pools";

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
        const item: object | undefined = list_copy.pop();
        // item shouldn't be null, compiler keeps complaining though
        // @ts-ignore
        if(item['id'] === list_copy[list_copy.length -1]['id']){
            duplicates_found = true;
            throw new Error("Found duplicates ids in list. Something may or may not be wrong with that.");
        }
    }
    if(!duplicates_found) console.log('No duplicate pool ids found.');

}