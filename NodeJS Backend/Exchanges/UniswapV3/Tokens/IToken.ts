import {TokenDayData} from "../TokenDayDatas/TokenDayDatas/TokenDayData";
import {Pool} from "../Pools/Pool";

export interface IToken {
    id: string // ID
    symbol: string // string
    name: string // String
    decimals: string // BigInt
    totalSupply: string // BigInt
    volume: string // BigDecimal
    volumeUSD: string // BigDecimal
    untrackedVolumeUSD: string // BigDecimal
    feesUSD: string // BigDecimal
    txCount: string // BigInt
    poolCount: string // BigInt
    totalValueLocked: string // BigDecimal
    totalValueLockedUSD: string // BigDecimal
    totalValueLockedUSDUntracked: string // BigDecimal
    derivedETH: string // BigDecimal
    whitelistPools: Pool[]
    tokenDayData: TokenDayData
}