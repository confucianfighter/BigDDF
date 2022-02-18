import {IToken} from "./IToken";
import {Block} from "../../../GraphQL/Blocks/Block";
import {BlockHelper} from "../../../GraphQL/Blocks/BlockHelper";
import {timer} from "../../../Utils/Timer";
import * as QueryBuilder from "../../../GraphQL/QueryBuilder";
import {TimeUnits} from "../../../Utils/TimeUtils";
import {OrderDirection, queryHelper} from "../../../GraphQL/QueryHelper";
import {gql} from "graphql-request";
import {BuildTokensQuery} from "./TokensQueryBulder";

export type TokenHash = {
    [key: string]: IToken;
};

/* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
export async function getTokens(first: number, orderBy:string, orderDirection:OrderDirection ): Promise<IToken[]>
{
    interface TokenData { tokens: IToken[]}
    // Gonna call a bunch of async functions, without using await,
    // stuff them into a list called promises and then wait until they are all filled:
    let blocks:Block[] = await new BlockHelper().getBlocks(1);
    timer.start("getTokens");
    let promises: Promise<TokenData>[] = []
    // 'first' is the variable passed into the query, like first: 10, first: 100 etc
    // it normally can only go to 1000.
    let first_count_down:number = first;
    let i:number = 0;
    while(first_count_down > 0) {
        // take the next 1000 unless there's only a few left:
        const adjusted_first = first_count_down < 1000? first_count_down : 1000;
        // going a thousand at a time, skip is another GraphQL query parameter:
        const skip_amount = 1000 * i;
        // generate a graphql query string:
        const query_str:string = BuildTokensQuery(adjusted_first, skip_amount, orderBy, orderDirection, undefined, blocks[0].number);
        // send the query, store the promise, don't wait, move on
        promises.push(queryHelper.sendQuery<TokenData>(query_str));
        // if this results in a negative number, we are done:
        first_count_down -= 1000;
        i++;
    }
    // Wait for all query results, build a pool list out of them:
    let token_list:IToken[] = []
    let results = await Promise.all(promises);
    for (let result of results) token_list = [...token_list, ...result.tokens];
    timer.stop();
    return token_list;
}
export async function getTokenNameHash(first:number, orderBy:string, direction = OrderDirection.desc):Promise<TokenHash>
{
    let tokenHash:TokenHash = {};
    let tokens = await getTokens(first,orderBy,direction);
    timer.start("Just making the token hash", TimeUnits.seconds);
    for(let token of tokens) {
        tokenHash[token.symbol.toUpperCase()] = token;
    }
    timer.stop();
    return tokenHash;
}

