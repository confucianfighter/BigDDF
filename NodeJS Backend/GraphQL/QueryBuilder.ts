import {gql} from 'graphql-request'


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



export function buildIDString(ids: string[]):string {
    let idString = `[`;
    // @ts-ignore -- already checking
    ids.map((address) => {
        return (idString += `"${address}",`);
    });
    idString += ']';
    return idString;
}

export function getBlocksQuery(first:number): string
{
    let query_str:string = gql`
    {
        blocks(first: ${first}, skip: 0, orderBy: number, orderDirection: desc, where: {number_gt: 9300000}) {
            id
            number
            timestamp
            parentHash
            author
            difficulty
            totalDifficulty
            gasUsed
            gasLimit
            receiptsRoot
            transactionsRoot
            stateRoot
            size
            unclesHash
        }
    }
    `
    return query_str;
}
