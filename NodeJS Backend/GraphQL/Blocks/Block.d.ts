export interface Block {
    id?: string;
    number?: number;
    timestamp?: number;
    parentHash?: string;
    author?: string;
    difficulty?: string;
    totalDifficulty?: string;
    gasUsed?: string;
    gasLimit?: string;
    receiptsRoot?: string;
    transactionsRoot?: string;
    stateRoot?: string;
    size?: string;
    unclesHash?: string;
}
export declare function printBlock(block: Block): string;
