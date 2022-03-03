import { IToken } from "./IToken";
import { OrderDirection } from "../../../GraphQL/QueryHelper";
export declare type TokenHash = {
    [key: string]: IToken;
};
export declare function getTokens(first: number, orderBy: string, orderDirection: OrderDirection): Promise<IToken[]>;
export declare function getTokenNameHash(first: number, orderBy: string, direction?: OrderDirection): Promise<TokenHash>;
