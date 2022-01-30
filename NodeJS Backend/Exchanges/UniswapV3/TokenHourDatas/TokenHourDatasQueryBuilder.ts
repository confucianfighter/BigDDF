import {gql} from "graphql-request";
import {buildIDString} from "../../../GraphQL/QueryBuilder";

export function buildTokenHourDatas(
    first?: number,
    skip?: number,
    orderBy?: string,
    orderDirection?:string,
    ids?:string[],
    block?:number|undefined): string {
    let idString:string | undefined
    // @ts-ignore
    if( ids !== undefined ) idString = buildIDString(ids);
    return gql `{
    tokenHourDatas(` +
        (idString? `where: {id_in: ${idString}} ,` : ``) +
        (first? `first: ${first}, ` : ``) +
        (skip? `skip: ${skip}, ` : ``) +
        (orderBy? `orderBy: ${orderBy},` : ``) +
        (orderDirection? `orderDirection: ${orderDirection.toString()} , `: ``) +
        (block ? `block: {number: ${block}} ,` : ``) +`)
        {
            id
            periodStartUnix
            token
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
            }
            volume
            volumeUSD
            untrackedVolumeUSD
            totalValueLocked
            totalValueLockedUSD
            priceUSD
            feesUSD
            open
            low
            close
        }
    }`
}