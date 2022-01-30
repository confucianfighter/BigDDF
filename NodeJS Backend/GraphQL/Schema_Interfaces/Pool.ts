// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import {Token} from "./Token";
export interface PoolData {
    id: string // ID!
    createdAtTimestamp: string // BigInt!
    createdAtBlockNumber: string // BigInt!
    token0: Token // Token!
    token1: Token // Token!
    feeTier: string // BigInt!
    liquidity: string // BigInt!
    sqrtPrice: string // BigInt!
    feeGrowthGlobal0X128: string // BigInt!
    feeGrowthGlobal1X128: string // BigInt!
    token0Price: string // BigDecimal!
    token1Price: string // BigDecimal!
    tick: string // BigInt
    observationIndex: string // BigInt!
    volumeToken0: string // BigDecimal!
    volumeToken1: string // BigDecimal!
    volumeUSD: string // BigDecimal!
    untrackedVolumeUSD: string // BigDecimal!
    feesUSD: string // BigDecimal!
    txCount: string // BigInt!
    collectedFeesToken0: string // BigDecimal!
    collectedFeesToken1: string // BigDecimal!
    collectedFeesUSD: string // BigDecimal!
    totalValueLockedToken0: string // BigDecimal!
    totalValueLockedToken1: string // BigDecimal!
    totalValueLockedETH: string // BigDecimal!
    totalValueLockedUSD: string // BigDecimal!
}
export class Pool{
    public id : string // ID!
    public createdAtTimestamp: string // BigInt!
    public createdAtBlockNumber: string // BigInt!
    public token0: Token // Token!
    public token1: Token // Token!
    public feeTier: string // BigInt!
    public liquidity: string // BigInt!
    public sqrtPrice: string // BigInt!
    public feeGrowthGlobal0X128: string // BigInt!
    public feeGrowthGlobal1X128: string // BigInt!
    public token0Price: string // BigDecimal!
    public token1Price: string // BigDecimal!
    public tick: string // BigInt
    public observationIndex: string // BigInt!
    public volumeToken0: string // BigDecimal!
    public volumeToken1: string // BigDecimal!
    public volumeUSD: string // BigDecimal!
    public untrackedVolumeUSD: string // BigDecimal!
    public feesUSD: string // BigDecimal!
    public txCount: string // BigInt!
    public collectedFeesToken0: string // BigDecimal!
    public collectedFeesToken1: string // BigDecimal!
    public collectedFeesUSD: string // BigDecimal!
    public totalValueLockedToken0: string // BigDecimal!
    public totalValueLockedToken1: string // BigDecimal!
    public totalValueLockedETH: string // BigDecimal!
    public totalValueLockedUSD: string // BigDecimal!

    constructor(data:PoolData) {
        this.id = data.id // ID!
        this.createdAtTimestamp = data.createdAtTimestamp; // BigInt!
        this.createdAtBlockNumber = data.createdAtBlockNumber // BigInt!
        this.token0 = data.token0; // Token!
        this.token1 = data.token1; // Token!
        this.feeTier = data.feeTier; // BigInt!
        this.liquidity = data.liquidity; // BigInt!
        this.sqrtPrice = data.sqrtPrice; // BigInt!
        this.feeGrowthGlobal0X128 = data.feeGrowthGlobal0X128; // BigInt!
        this.feeGrowthGlobal1X128 = data.feeGrowthGlobal1X128; // BigInt!
        this.token0Price = data.token0Price; // BigDecimal!
        this.token1Price = data.token1Price; // BigDecimal!
        this.tick = data.tick; // BigInt
        this.observationIndex = data.observationIndex; // BigInt!
        this.volumeToken0 = data.volumeToken0; // BigDecimal!
        this.volumeToken1 = data.volumeToken1; // BigDecimal!
        this.volumeUSD = data.volumeUSD; // BigDecimal!
        this.untrackedVolumeUSD = data.untrackedVolumeUSD; // BigDecimal!
        this.feesUSD = data.feesUSD; // BigDecimal!
        this.txCount = data.txCount; // BigInt!
        this.collectedFeesToken0 = data.collectedFeesToken0; // BigDecimal!
        this.collectedFeesToken1 = data.collectedFeesToken1; // BigDecimal!
        this.collectedFeesUSD = data.collectedFeesUSD; // BigDecimal!
        this.totalValueLockedToken0 = data.totalValueLockedToken0; // BigDecimal!
        this.totalValueLockedToken1 = data.totalValueLockedToken1; // BigDecimal!
        this.totalValueLockedETH = data.totalValueLockedETH; // BigDecimal!
        this.totalValueLockedUSD = data.totalValueLockedUSD; // BigDecimal!
    }

    public static getETHPriceUSD(pool:Pool): number {
        if(pool.token0?.symbol === "WETH") {
            return parseFloat(<string>pool.token1Price);
        }
        else if(pool.token1?.symbol === "WETH") {
            return parseFloat(<string>pool.token0Price);
        }
        else throw new Error("Pool does not have a token called WETH! WTFO!");
    }
    public print()
    {
        let out_str = `
        Pool ${this.token0?.symbol}-${this.token1?.symbol}
            id: ${this.id}
        `
        return out_str;
    }
}


