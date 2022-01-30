import {BlockHelper} from "./BlockHelper";

export interface Block {
    id?: string; // ID!
    number?: number; // BigInt!
    timestamp?: number; // BigInt!
    parentHash?: string; // String
    author?: string; // String
    difficulty?: string; // BigInt
    totalDifficulty?: string; // BigInt
    gasUsed?: string; // BigInt
    gasLimit?: string; // BigInt
    receiptsRoot?: string; // String
    transactionsRoot?: string; // String
    stateRoot?: string; // String
    size?: string; // BigInt
    unclesHash?: string; // String

}

export function printBlock(block:Block):string
{
    const out_str:string = `
            Block number: ${block.number}
            Timestamp: ${new BlockHelper().getReadableBlockTimestamp(block)}
            `
    return out_str;
}

