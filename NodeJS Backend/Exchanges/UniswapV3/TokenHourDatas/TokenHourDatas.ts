import {TokenHourData} from "./TokenHourData";
import {Block} from "../../../GraphQL/Blocks/Block";
import {BlockHelper} from "../../../GraphQL/Blocks/BlockHelper";
import {OrderDirection, queryHelper} from "../../../GraphQL/QueryHelper";
import {buildTokenHourDatas} from "./TokenHourDatasQueryBuilder";

export async function getTokenHourData(
    first: number,
    orderBy:string,
    orderDirection:OrderDirection ): Promise<TokenHourData[]> {
    interface TokenHourResponse { tokenHourDatas:TokenHourData[]}
    // Gonna call a bunch of async functions, without using await,
    // stuff them into a list called promises and then wait until they are all filled:
    let promises: Promise<TokenHourResponse>[] = []
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
        let block = <number>blocks[0].number -1;
        const query_str:string =
            buildTokenHourDatas(adjusted_first, skip_amount,orderBy,orderDirection, undefined, block)
        // send the query, store the promise, don't wait, move on
        promises.push(queryHelper.sendQuery<TokenHourResponse>(query_str));
        // if this results in a negative number, we are done:
        first_count_down -= 1000;
        i++;
    }
    // Wait for all query results, build a pool list out of them:
    let tokenHourDatas: TokenHourData[] = []
    let results = await Promise.all(promises);
    for (let result of results) tokenHourDatas = [...tokenHourDatas, ...result.tokenHourDatas];

    return tokenHourDatas;
}
