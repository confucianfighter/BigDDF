import {TokenDayData} from "./TokenDayData";
import {Block} from "../../../../GraphQL/Blocks/Block";
import {BlockHelper} from "../../../../GraphQL/Blocks/BlockHelper";
import * as QueryBuilder from "../../../../GraphQL/QueryBuilder";
import {OrderDirection, queryHelper} from "../../../../GraphQL/QueryHelper";
import {TokenDayDatas} from "./TokenDayDatasQueryBuilder";

export async function getTokenDayData(
    first: number,
    orderBy:string,
    orderDirection:OrderDirection ): Promise<TokenDayData[]> {
    interface TokenDay { tokenDayDatas:TokenDayData[]}
    // Gonna call a bunch of async functions, without using await,
    // stuff them into a list called promises and then wait until they are all filled:
    let promises: Promise<TokenDay>[] = [];
    let blocks:Block[] = await new BlockHelper().getBlocks(1);
    // 'first' is the variable passed into the query, like first: 10, first: 100 etc
    // it normally can only go to 1000.
    let first_count_down:number = first;
    let i:number = 0;
    while(first_count_down > 0) {
        // take the next 1000 unless there's only a few left:
        const adjusted_first = first_count_down < 1000? first_count_down: 1000;
        // going a thousand at a time, skip is another GraphQL query parameter:
        const skip_amount = 1000 * i;
        // generate a graphql query string:
        const query_str:string =
            TokenDayDatas(adjusted_first, skip_amount,orderBy,orderDirection, undefined, blocks[0].number)
        // send the query, store the promise, don't wait, move on
        promises.push(queryHelper.sendQuery<TokenDay>(query_str));
        // if this results in a negative number, we are done:
        first_count_down -= 1000;
        i++;
    }
    // Wait for all query results, build a pool list out of them:
    let tokenDayDatas: TokenDayData[] = []
    let results = await Promise.all(promises);
    for (let result of results) tokenDayDatas = [...tokenDayDatas, ...result.tokenDayDatas];
    return tokenDayDatas;
}