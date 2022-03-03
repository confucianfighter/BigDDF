import {gql} from 'graphql-request'

export interface QueryParams {

}
export function buildIDString(ids: string[]):string {
    let idString = `[`;
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
