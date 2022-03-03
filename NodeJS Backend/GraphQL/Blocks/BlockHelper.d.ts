import { Block } from './Block';
export declare class BlockHelper {
    static Singleton: BlockHelper | null;
    lastBlock: Block | null;
    currentBlock: Block | null;
    minutes_between_blocks: number | undefined;
    private provider_url;
    constructor(provider_url?: string);
    getBlocks(first: number): Promise<Block[]>;
    private computeUpdateTime;
    private queryBlocks;
    useDeltaTimestamps(): [string, string, string];
    getReadableBlockTimestamp(block: Block): string;
}
