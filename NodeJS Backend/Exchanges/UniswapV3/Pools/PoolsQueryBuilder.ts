import {gql} from "graphql-request";
import {queryHelper} from "../../../GraphQL/QueryHelper";
import {buildIDString} from "../../../GraphQL/QueryBuilder";

export function buildPoolsQuery(
    first?: number,
    skip?: number,
    orderBy?: string,
    orderDirection?:string,
    ids?:string[],
    block?:number|undefined): string {

    let idString:string | undefined = undefined
    // @ts-ignore
    if( ids !== undefined )
    {
        idString = buildIDString(ids);
    }
    const query_str:string = gql `{
    pools(` +
        (idString? `where: {id_in: ${idString}} ,` : ``) +
        (first? `first: ${first}, ` : ``) +
        (skip? `skip: ${skip}, ` : ``) +
        (orderBy? `orderBy: ${orderBy},` : ``) +
        (orderDirection? `orderDirection: ${orderDirection.toString()} , `: ``) +
        (block? `block: {number: ${block}} ,` : ``) +`)
           {
                id #: ID!
                createdAtTimestamp #: BigInt!
                createdAtBlockNumber #: BigInt!
                feeTier #: BigInt!
                liquidity #: BigInt!
                sqrtPrice #: BigInt!
                feeGrowthGlobal0X128 #: BigInt!
                feeGrowthGlobal1X128 #: BigInt!
                token0Price #: BigDecimal!
                token1Price #: BigDecimal!
                tick #: BigInt
                observationIndex #: BigInt!
                volumeToken0 #: BigDecimal!
                volumeToken1 #: BigDecimal!
                volumeUSD #: BigDecimal!
                untrackedVolumeUSD #: BigDecimal!
                feesUSD #: BigDecimal!
                txCount #: BigInt!
                collectedFeesToken0 #: BigDecimal!
                collectedFeesToken1 #: BigDecimal!
                collectedFeesUSD #: BigDecimal!
                totalValueLockedToken0 #: BigDecimal!
                totalValueLockedToken1 #: BigDecimal!
                totalValueLockedETH #: BigDecimal!
                totalValueLockedUSD #: BigDecimal!
                totalValueLockedUSDUntracked #: BigDecimal!
                liquidityProviderCount #: BigInt!
                token0
                {
                    id
                    symbol         
                }     
                token1
                {
                    id
                    symbol
                }    
                # Has fields: poolHourData #: [PoolHourData!]!
                # Has fields: poolDayData #: [PoolDayData!]!
                # Has fields: mints #: [Mint!]!
                # Has fields: burns #: [Burn!]!
                # Has fields: swaps #: [Swap!]!
                # Has fields: collects #: [Collect!]!
                # Has fields: ticks #: [Tick!]!
           }    
    }`
    return query_str;
}
