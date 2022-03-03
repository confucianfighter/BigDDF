import { TokenHourData } from "./TokenHourData";
import { OrderDirection } from "../../../GraphQL/QueryHelper";
export declare function getTokenHourData(first: number, orderBy: string, orderDirection: OrderDirection): Promise<TokenHourData[]>;
