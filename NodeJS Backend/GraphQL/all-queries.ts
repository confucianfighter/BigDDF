import {gql} from 'graphql-request'

export function pools_query(first: number, skip: number, orderBy: string, orderDirection:string = 'desc'): string {
    const query_str:string = gql `{
    pools(first: ${first}, skip:${skip}, orderBy:${orderBy}, orderDirection:${orderDirection.toString()})
           {
               id
               liquidity
               volumeUSD
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
               token0Price
               token1Price
               txCount
               liquidityProviderCount   
           }    
    }`
    return query_str;
}
export function poolsByIDQuery(ids:string[],block?:number|undefined):string{
    let poolString = `[`
    ids.map((address) => {
        return (poolString += `"${address}",`)
    })
    poolString += ']'
    const queryString =
        `
    query pools {
      pools(where: {id_in: ${poolString}},` +
        (block ? `block: {number: ${block}} ,` : ``) +
        ` orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {
        id
        feeTier
        liquidity
        sqrtPrice
        tick
        token0 {
            id
            symbol
            name
            decimals
            derivedETH
        }
        token1 {
            id
            symbol
            name
            decimals
            derivedETH
        }
        token0Price
        token1Price
        volumeUSD
        txCount
        totalValueLockedToken0
        totalValueLockedToken1
        totalValueLockedUSD
      }
    }
    `
    return(queryString);
}