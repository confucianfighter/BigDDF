import { TokenDayData } from "../TokenDayDatas/TokenDayDatas/TokenDayData";
import { Pool } from "../Pools/Pool";
export interface IToken {
    id: string;
    symbol: string;
    name: string;
    decimals: string;
    totalSupply: string;
    volume: string;
    volumeUSD: string;
    untrackedVolumeUSD: string;
    feesUSD: string;
    txCount: string;
    poolCount: string;
    totalValueLocked: string;
    totalValueLockedUSD: string;
    totalValueLockedUSDUntracked: string;
    derivedETH: string;
    whitelistPools: Pool[];
    tokenDayData: TokenDayData;
}
