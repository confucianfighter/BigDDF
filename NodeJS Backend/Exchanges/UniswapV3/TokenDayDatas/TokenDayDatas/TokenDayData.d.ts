import { IToken } from "../../Tokens/IToken";
export interface TokenDayData {
    id: string;
    date: string;
    token: IToken;
    volume: string;
    volumeUSD: string;
    untrackedVolumeUSD: string;
    totalValueLocked: string;
    totalValueLockedUSD: string;
    priceUSD: string;
    feesUSD: string;
    open: string;
    high: string;
    low: string;
    close: string;
}
