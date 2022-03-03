import {gql} from "graphql-request";
import {buildIDString} from "../../../GraphQL/QueryBuilder";

export function BuildTokensQuery(
    first?: number,
    skip?: number,
    orderBy?: string,
    orderDirection?:string,
    ids?:string[],
    block?:number|undefined): string {
    let idString:string | undefined = undefined
    if( ids !== undefined) idString = buildIDString(ids);
    const query_str:string = gql `{
    tokens(` +
        (idString? `where: {id_in: ${idString}} ,` : ``) +
        (first? `first: ${first}, ` : ``) +
        (skip? `skip: ${skip}, ` : ``) +
        (orderBy? `orderBy: ${orderBy},` : ``) +
        (orderDirection? `orderDirection: ${orderDirection.toString()} , `: ``) +
        (block ? `block: {number: ${block}} ,` : ``) +`)
        {
                id #: ID!
                symbol #: String!
                name #: String!
                decimals #: BigInt!
                totalSupply #: BigInt!
                volume #: BigDecimal!
                volumeUSD #: BigDecimal!
                untrackedVolumeUSD #: BigDecimal!
                feesUSD #: BigDecimal!
                txCount #: BigInt!
                poolCount #: BigInt!
                totalValueLocked #: BigDecimal!
                totalValueLockedUSD #: BigDecimal!
                totalValueLockedUSDUntracked #: BigDecimal!
                derivedETH #: BigDecimal!
                whitelistPools {
                    id
                    volumeUSD
                }
                tokenDayData {
                    id
                    date # ten digit number with no quotes
                    volume
                    volumeUSD
                    untrackedVolumeUSD
                    totalValueLocked
                    totalValueLockedUSD
                    priceUSD
                    feesUSD
                    open
                    high
                    low
                    close
                }  
           }    
    }`
    return query_str;
}