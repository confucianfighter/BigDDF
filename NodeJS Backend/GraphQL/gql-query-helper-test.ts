import {OrderDirection, QueryHelper} from "./gql-query-helper";
import moment = require("moment-timezone");

async function test()
{
    let qh: QueryHelper = new QueryHelper();

    const result = await qh.getPools(5000, "volumeUSD", OrderDirection.desc );
    console.log(`There are ${result.length} pools.`);

    for(let pool of result) {
        console.log(`
        Pool ID: ${pool['id']}
        1 ${pool['token0']['symbol']} is worth ${pool['token1Price']} ${pool['token1']['symbol']}
        1 ${pool['token1']['symbol']} is worth ${pool['token0Price']} ${pool['token0']['symbol']}`);
    }

    let pool_match_list: object[] = await qh.getPoolIdByCoinMatch(['WETH','DAI'],1000);
    for(let match of pool_match_list) {
        let match_id = match['id'];
        console.log(`Matched pool id is ${match_id}`);
    }
    await checkForDuplicatesById(pool_match_list);
    let before = moment('2022-01-13T12:00:00Z')
    let now = moment(new Date());
    console.log(now.tz('America/New_York').format('MM/DD/YYYY h:ma z'));
    let id_list = await qh.getIDsFromPoolList(result);
    let fetched_pools:object[] = await qh.getPoolsByID(id_list);
    console.log("id_list: " + "\n" +
            id_list + "\n" +
            "fetched_pools:" + '\n' );
    console.log(fetched_pools);
    console.log("Pools length is: " + result.length);
}
// Test if queries ever return duplicates:
async function checkForDuplicatesById(list:object[]): Promise<void>
{
    let duplicates_found:Boolean = false;
    let list_copy:object[] = [...list];

    list_copy = list_copy.sort(new QueryHelper().sort_pools_by_id_func);
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

test();