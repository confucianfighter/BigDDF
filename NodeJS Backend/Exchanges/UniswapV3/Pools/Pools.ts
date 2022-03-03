/* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
import {Pool, PoolData} from "./Pool";
import {Block} from "../../../GraphQL/Blocks/Block";
import {BlockHelper} from "../../../GraphQL/Blocks/BlockHelper";
import * as QueryBuilder from "../../../GraphQL/QueryBuilder";
import {OrderDirection, queryHelper} from "../../../GraphQL/QueryHelper";
import {buildPoolsQuery} from "./PoolsQueryBuilder";

interface PoolsResponse { pools:PoolData[]}

export async function getPools(first: number, orderBy:string, orderDirection:OrderDirection ): Promise<Pool[]>
{
    // Gonna call a bunch of async functions, without using await,
    // stuff them into a list called promises and then wait until they are all filled:
    let promises: Promise<PoolsResponse>[] = []
    // 'first' is the variable passed into the query, like first: 10, first: 100 etc
    // it normally can only go to 1000.
    let blocks:Block[] = await new BlockHelper().getBlocks(1);
    let first_count_down:number = first;
    let i:number = 0;
    while(first_count_down > 0) {
        // take the next 1000 unless there's only a few left:
        const adjusted_first = first_count_down < 1000? first_count_down: 1000;
        // going a thousand at a time, skip is another GraphQL query parameter:
        const skip_amount = 1000 * i;
        // generate a graphql query string:
        const query_str:string = buildPoolsQuery(adjusted_first, skip_amount, orderBy, orderDirection, undefined, blocks[0].number);
        // send the query, store the promise, don't wait, move on
        promises.push(queryHelper.sendQuery<PoolsResponse>(query_str));
        // if this results in a negative number, we are done:
        first_count_down -= 1000;
        i++;
    }
    // Wait for all query results, build a pool list out of them:
    let pool_list:Pool[] = []
    let results = await Promise.all(promises);
    for (let result of results) {
        for(let poolData of result.pools)
        {
            let pool:Pool = new Pool(poolData);
            pool_list = [...pool_list, pool];
        }
    }
    return pool_list;
}
/*
Returns id list of all pools with specified coin name pair.
*/
export async function getPoolByTokenMatch(symbol_list: string[], first:number): Promise<Pool[]> {
    const result:Pool[] = await getPools(first,'volumeUSD', OrderDirection.desc);
    let match_list: Pool[] = [];
    for (let i: number = 0; i < result.length; i++) {
        const pool:Pool = result[i];
        if (pool.token0?.symbol === symbol_list[0] || pool.token0?.symbol === symbol_list[1]) {
            if (pool.token1?.symbol === symbol_list[0] || pool.token1?.symbol === symbol_list[1]) {
                match_list.push(pool);
            }
        }
    }
    return match_list;
}
/*Runs a pool query from a list of ids
    * can only run 100 at a time, so if there's more than 100,
    * this runs them all at once:*/
export async function getPoolsByID(ids_list:string[]): Promise<Pool[]> {
    interface PoolsResponse {pools:Pool[]}
    let ids: string[] = [...ids_list]
    let blocks:Block[] = await new BlockHelper().getBlocks(1);
    let result_list:Pool[] = []
    let promises:Promise<PoolsResponse>[] = []
    while (ids.length > 0) {
        // I'd use array.splice, but I'm Array retarded.
        let splice_amount = ids.length >= 20? 20:ids.length;
        let ids_fragment :string[] = []
        for(let i = 0; i < splice_amount; i++) {
            let id = ids.pop();
            ids_fragment.push(<string>id);
        }
        let query_str: string = buildPoolsQuery(undefined, undefined,undefined, undefined, ids_fragment, blocks[0].number);
        // take the promise, don't wait
        promises.push(queryHelper.sendQuery<PoolsResponse>(query_str));
    }
    // now wait for all queries to finish and build the pools list:
    let results = await Promise.all(promises);
    for(let pool of results){
        // ... is called the spreader operator, just unpacks the list
        result_list = [...result_list, ...pool.pools]
    }
    //make sure everything matches:
    await verifyAllIDsPresent(ids, result_list);
    return result_list;
}
// Gets Pool IDs as a list of strings
export function getIDsFromPoolList(pools:Pool[]):string[]
{
    let ids:string[] = [];
    for(let pool of pools){
        ids = [...ids, <string>pool['id']]
    }
    return ids
}

/* goes through id list and list of pools and makes sure it all matches*/
export async function verifyAllIDsPresent(ids:string[], pools:Pool[])
{
    let ids_copy = [...ids]
    ids_copy = ids_copy.sort(sort_ids_func );
    let pools_copy = [...pools];
    pools_copy = pools_copy.sort(sort_pools_by_id_func);
    for(let i = 0; i < ids_copy.length; i++){
        let list_id = ids_copy[i]
        let pool_id = pools_copy[i]['id'];
        if( list_id !== pool_id){
            throw new Error("Failed to fetch all ids.");
        }
    }
    console.log("Query fetched all ids correctly.")
}

// same as above but id string is in an object:
export function sort_pools_by_id_func(a:Pool,b:Pool){
    // convert to hex to make sure we are dealing with actual ids.
    let aID = <string>a['id'];
    let bID = <string>b['id'];
    let aNum:Number = parseInt(aID,16);
    let bNum:Number = parseInt(bID, 16);
    if(aNum > bNum) return 1;
    if(aNum < bNum) return -1;
    else return 0;
}
// sort function that sorts string guids
export function sort_ids_func(aID:string,bID:string){
    let aNum:Number = parseInt(aID,16);
    let bNum:Number = parseInt(bID, 16);
    if(aNum > bNum) return 1;
    if(aNum < bNum) return -1;
    else return 0;
}
export function sort_pools_by_token0_symbol(a:Pool, b:Pool)
{
    if(a.token0.symbol > b.token0.symbol) return 1;
    else if(a.token0.symbol < b.token0.symbol) return -1;
    else return 0;
}
export function sort_pools_by_token1_symbol(a:Pool, b:Pool) {
    if (a.token0.symbol > b.token0.symbol) return 1;
    else if (a.token0.symbol < b.token0.symbol) return -1;
    else return 0;
}
