import {gql} from 'graphql-request'

export function Pools(
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

export function Tokens(
first?: number,
skip?: number,
orderBy?: string,
orderDirection?:string,
ids?:string[],
block?:number|undefined): string {

    let idString:string | undefined = undefined
    // @ts-ignore
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

export function TokenDayDatas(
first?: number,
skip?: number,
orderBy?: string,
orderDirection?: string,
ids?: string[],
block?: number| undefined): string {
    let idString:string | undefined = undefined
    // @ts-ignore
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

export function TokenHourDatas(
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

//*export function poolsByIDQuery(ids:string[],block?:number|undefined):string{
//*    let idString: string | undefined = undefined;
//*    if( ids !== undefined ) idString = buildIDString(ids);
//*    const queryString =
//*        `
//*    query pools {
//*      pools(where: {id_in: ${idString}},` +
//*        (block ? `block: {number: ${block}} ,` : ``) +
//*        ` orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {
//*        id
//*        feeTier
//*        liquidity
//*        sqrtPrice
//*        tick
//*        token0 {
//*            id
//*            symbol
//*            name
//*            decimals
//*            derivedETH
//*        }
//*        token1 {
//*            id
//*            symbol
//*            name
//*            decimals
//*            derivedETH
//*        }
//*        token0Price
//*        token1Price
//*        volumeUSD
//*        txCount
//*        totalValueLockedToken0
//*        totalValueLockedToken1
//*        totalValueLockedUSD
//*      }
//*    }
//*    `
//*    return(queryString);
//*}

function buildIDString(ids: string[]):string {
    let idString = `[`;
    // @ts-ignore -- already checking
    ids.map((address) => {
        return (idString += `"${address}",`);
    });
    idString += ']';
    return idString;
}