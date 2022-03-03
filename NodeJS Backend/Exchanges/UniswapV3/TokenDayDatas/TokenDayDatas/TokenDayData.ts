import {IToken} from "../../Tokens/IToken";

export interface TokenDayData {
    id: string // ID!
    date: string // Int!
    token: IToken // IToken!
    volume: string // BigDecimal!
    volumeUSD: string // BigDecimal!
    untrackedVolumeUSD: string // BigDecimal!
    totalValueLocked: string // BigDecimal!
    totalValueLockedUSD: string // BigDecimal!
    priceUSD: string // BigDecimal!
    feesUSD: string // BigDecimal!
    open: string // BigDecimal!
    high: string // BigDecimal!
    low: string // BigDecimal!
    close: string // BigDecimal!
}