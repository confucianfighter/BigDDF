import { IToken } from "../Tokens/IToken";
export declare class TokenHourData {
    id?: string;
    periodStartUnix?: string;
    token?: IToken;
    volume?: string;
    volumeUSD?: string;
    untrackedVolumeUSD?: string;
    totalValueLocked?: string;
    totalValueLockedUSD?: string;
    priceUSD?: string;
    feesUSD?: string;
    open?: string;
    high?: string;
    low?: string;
    close?: string;
}
