// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import {Token} from "./Token";

export class Pool{
    id?: string // ID!
    createdAtTimestamp?: string // BigInt!
    createdAtBlockNumber?: string // BigInt!
    token0?: Token // Token!
    token1?: Token // Token!
    feeTier?: string // BigInt!
    liquidity?: string // BigInt!
    sqrtPrice?: string // BigInt!
    feeGrowthGlobal0X128?: string // BigInt!
    feeGrowthGlobal1X128?: string // BigInt!
    token0Price?: string // BigDecimal!
    token1Price?: string // BigDecimal!
    tick?: string // BigInt
    observationIndex?: string // BigInt!
    volumeToken0?: string // BigDecimal!
    volumeToken1?: string // BigDecimal!
    volumeUSD?: string // BigDecimal!
    untrackedVolumeUSD?: string // BigDecimal!
    feesUSD?: string // BigDecimal!
    txCount?: string // BigInt!
    collectedFeesToken0?: string // BigDecimal!
    collectedFeesToken1?: string // BigDecimal!
    collectedFeesUSD?: string // BigDecimal!
    totalValueLockedToken0?: string // BigDecimal!
    totalValueLockedToken1?: string // BigDecimal!
    totalValueLockedETH?: string // BigDecimal!
    totalValueLockedUSD?: string // BigDecimal!
    //poolHourData?: //  [PoolHourData!]!
    //poolDayData?: //  [PoolDayData!]!
    //mints?: //  [Mint!]!
    //burns?: //  [Burn!]!
    //swaps?: //  [Swap!]!
    //collects?: //  [Collect!]!
    //ticks?: //  [Tick!]!
    public static getETHPriceUSD(pool:Pool): number {
        if(pool.token0?.symbol === "WETH") {
            return parseFloat(<string>pool.token1Price);
        }
        else if(pool.token1?.symbol === "WETH") {
            return parseFloat(<string>pool.token0Price);
        }
        else throw new Error("Pool does not have a token called WETH! WTFO!");
    };
}


