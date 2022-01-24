import { Token } from "./Token";
export declare class Pool {
    id?: string;
    createdAtTimestamp?: string;
    createdAtBlockNumber?: string;
    token0?: Token;
    token1?: Token;
    feeTier?: string;
    liquidity?: string;
    sqrtPrice?: string;
    feeGrowthGlobal0X128?: string;
    feeGrowthGlobal1X128?: string;
    token0Price?: string;
    token1Price?: string;
    tick?: string;
    observationIndex?: string;
    volumeToken0?: string;
    volumeToken1?: string;
    volumeUSD?: string;
    untrackedVolumeUSD?: string;
    feesUSD?: string;
    txCount?: string;
    collectedFeesToken0?: string;
    collectedFeesToken1?: string;
    collectedFeesUSD?: string;
    totalValueLockedToken0?: string;
    totalValueLockedToken1?: string;
    totalValueLockedETH?: string;
    totalValueLockedUSD?: string;
    static getETHPriceUSD(pool: Pool): number;
}
