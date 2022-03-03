import {gql} from "graphql-request";
import {buildIDString} from "../../../../GraphQL/QueryBuilder";

export function TokenDayDatas(
    first?: number,
    skip?: number,
    orderBy?: string,
    orderDirection?: string,
    ids?: string[],
    block?: number| undefined): string {
    let idString:string | undefined = undefined
    if( ids !== undefined ) idString = buildIDString(ids);
    const query_str:string = gql `{
    tokenDayDatas(` +
        (idString? `where: {id_in: ${idString}} ,` : ``) +
        (first? `first: ${first}, ` : ``) +
        (skip? `skip: ${skip}, ` : ``) +
        (orderBy? `orderBy: ${orderBy},` : ``) +
        (orderDirection? `orderDirection: ${orderDirection.toString()} , `: ``) +
        (block ? `block: {number: ${block}} ,` : ``) +`)
        {
            id #: ID!
            date #: Int!
            token 
            {
                id
                symbol
                poolCount
            }
            volume #: BigDecimal!
            volumeUSD #: BigDecimal!
            untrackedVolumeUSD #: BigDecimal!
            totalValueLocked #: BigDecimal!
            totalValueLockedUSD #: BigDecimal!
            priceUSD #: BigDecimal!
            feesUSD #: BigDecimal!
            open #: BigDecimal!
            high #: BigDecimal!
            low #: BigDecimal!
            close #: BigDecimal!
        }
    }`
    return query_str
}
