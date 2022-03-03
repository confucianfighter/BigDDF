import { TokenDayData } from "./TokenDayData";
import { OrderDirection } from "../../../../GraphQL/QueryHelper";
export declare function getTokenDayData(first: number, orderBy: string, orderDirection: OrderDirection): Promise<TokenDayData[]>;
