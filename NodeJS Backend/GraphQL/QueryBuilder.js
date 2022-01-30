"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocksQuery = exports.TokenHourDatas = exports.TokenDayDatas = exports.Pools = void 0;
var graphql_request_1 = require("graphql-request");
function Pools(first, skip, orderBy, orderDirection, ids, block) {
    var idString = undefined;
    // @ts-ignore
    if (ids !== undefined) {
        idString = buildIDString(ids);
    }
    var query_str = (0, graphql_request_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{\n    pools("], ["{\n    pools("]))) +
        (idString ? "where: {id_in: ".concat(idString, "} ,") : "") +
        (first ? "first: ".concat(first, ", ") : "") +
        (skip ? "skip: ".concat(skip, ", ") : "") +
        (orderBy ? "orderBy: ".concat(orderBy, ",") : "") +
        (orderDirection ? "orderDirection: ".concat(orderDirection.toString(), " , ") : "") +
        (block ? "block: {number: ".concat(block, "} ,") : "") + ")\n           {\n                id #: ID!\n                createdAtTimestamp #: BigInt!\n                createdAtBlockNumber #: BigInt!\n                feeTier #: BigInt!\n                liquidity #: BigInt!\n                sqrtPrice #: BigInt!\n                feeGrowthGlobal0X128 #: BigInt!\n                feeGrowthGlobal1X128 #: BigInt!\n                token0Price #: BigDecimal!\n                token1Price #: BigDecimal!\n                tick #: BigInt\n                observationIndex #: BigInt!\n                volumeToken0 #: BigDecimal!\n                volumeToken1 #: BigDecimal!\n                volumeUSD #: BigDecimal!\n                untrackedVolumeUSD #: BigDecimal!\n                feesUSD #: BigDecimal!\n                txCount #: BigInt!\n                collectedFeesToken0 #: BigDecimal!\n                collectedFeesToken1 #: BigDecimal!\n                collectedFeesUSD #: BigDecimal!\n                totalValueLockedToken0 #: BigDecimal!\n                totalValueLockedToken1 #: BigDecimal!\n                totalValueLockedETH #: BigDecimal!\n                totalValueLockedUSD #: BigDecimal!\n                totalValueLockedUSDUntracked #: BigDecimal!\n                liquidityProviderCount #: BigInt!\n                token0\n                {\n                    id\n                    symbol         \n                }     \n                token1\n                {\n                    id\n                    symbol\n                }    \n                # Has fields: poolHourData #: [PoolHourData!]!\n                # Has fields: poolDayData #: [PoolDayData!]!\n                # Has fields: mints #: [Mint!]!\n                # Has fields: burns #: [Burn!]!\n                # Has fields: swaps #: [Swap!]!\n                # Has fields: collects #: [Collect!]!\n                # Has fields: ticks #: [Tick!]!\n           }    \n    }";
    return query_str;
}
exports.Pools = Pools;
function TokenDayDatas(first, skip, orderBy, orderDirection, ids, block) {
    var idString = undefined;
    // @ts-ignore
    if (ids !== undefined)
        idString = buildIDString(ids);
    var query_str = (0, graphql_request_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{\n    tokenDayDatas("], ["{\n    tokenDayDatas("]))) +
        (idString ? "where: {id_in: ".concat(idString, "} ,") : "") +
        (first ? "first: ".concat(first, ", ") : "") +
        (skip ? "skip: ".concat(skip, ", ") : "") +
        (orderBy ? "orderBy: ".concat(orderBy, ",") : "") +
        (orderDirection ? "orderDirection: ".concat(orderDirection.toString(), " , ") : "") +
        (block ? "block: {number: ".concat(block, "} ,") : "") + ")\n        {\n            id #: ID!\n            date #: Int!\n            token \n            {\n                id\n                symbol\n                poolCount\n            }\n            volume #: BigDecimal!\n            volumeUSD #: BigDecimal!\n            untrackedVolumeUSD #: BigDecimal!\n            totalValueLocked #: BigDecimal!\n            totalValueLockedUSD #: BigDecimal!\n            priceUSD #: BigDecimal!\n            feesUSD #: BigDecimal!\n            open #: BigDecimal!\n            high #: BigDecimal!\n            low #: BigDecimal!\n            close #: BigDecimal!\n        }\n    }";
    return query_str;
}
exports.TokenDayDatas = TokenDayDatas;
function TokenHourDatas(first, skip, orderBy, orderDirection, ids, block) {
    var idString;
    // @ts-ignore
    if (ids !== undefined)
        idString = buildIDString(ids);
    return (0, graphql_request_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["{\n    tokenHourDatas("], ["{\n    tokenHourDatas("]))) +
        (idString ? "where: {id_in: ".concat(idString, "} ,") : "") +
        (first ? "first: ".concat(first, ", ") : "") +
        (skip ? "skip: ".concat(skip, ", ") : "") +
        (orderBy ? "orderBy: ".concat(orderBy, ",") : "") +
        (orderDirection ? "orderDirection: ".concat(orderDirection.toString(), " , ") : "") +
        (block ? "block: {number: ".concat(block, "} ,") : "") + ")\n        {\n            id\n            periodStartUnix\n            token\n            {\n                id #: ID!\n                symbol #: String!\n                name #: String!\n                decimals #: BigInt!\n                totalSupply #: BigInt!\n                volume #: BigDecimal!\n                volumeUSD #: BigDecimal!\n                untrackedVolumeUSD #: BigDecimal!\n                feesUSD #: BigDecimal!\n                txCount #: BigInt!\n                poolCount #: BigInt!\n                totalValueLocked #: BigDecimal!\n                totalValueLockedUSD #: BigDecimal!\n                totalValueLockedUSDUntracked #: BigDecimal!\n                derivedETH #: BigDecimal!\n                whitelistPools {\n                    id\n                    volumeUSD\n                }                \n            }\n            volume\n            volumeUSD\n            untrackedVolumeUSD\n            totalValueLocked\n            totalValueLockedUSD\n            priceUSD\n            feesUSD\n            open\n            low\n            close\n        }\n    }";
}
exports.TokenHourDatas = TokenHourDatas;
//*export function poolsByIDQuery(ids:string[],block?:number|undefined):string{
//*    let idString: string | undefined = undefined;
//*    if( ids !== undefined ) idString = buildIDString(ids);
//*    const queryString =
//*        `
//*    query pools {
//*      pools(where: {id_in: ${idString}},` +
//*        (block ? `block: {number: ${block}} ,` : ``) +
//*        ` orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {
//*        id
//*        feeTier
//*        liquidity
//*        sqrtPrice
//*        tick
//*        token0 {
//*            id
//*            symbol
//*            name
//*            decimals
//*            derivedETH
//*        }
//*        token1 {
//*            id
//*            symbol
//*            name
//*            decimals
//*            derivedETH
//*        }
//*        token0Price
//*        token1Price
//*        volumeUSD
//*        txCount
//*        totalValueLockedToken0
//*        totalValueLockedToken1
//*        totalValueLockedUSD
//*      }
//*    }
//*    `
//*    return(queryString);
//*}
function buildIDString(ids) {
    var idString = "[";
    // @ts-ignore -- already checking
    ids.map(function (address) {
        return (idString += "\"".concat(address, "\","));
    });
    idString += ']';
    return idString;
}
function getBlocksQuery(first) {
    var query_str = (0, graphql_request_1.gql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    {\n        blocks(first: ", ", skip: 0, orderBy: number, orderDirection: desc, where: {number_gt: 9300000}) {\n            id\n            number\n            timestamp\n            parentHash\n            author\n            difficulty\n            totalDifficulty\n            gasUsed\n            gasLimit\n            receiptsRoot\n            transactionsRoot\n            stateRoot\n            size\n            unclesHash\n        }\n    }\n    "], ["\n    {\n        blocks(first: ", ", skip: 0, orderBy: number, orderDirection: desc, where: {number_gt: 9300000}) {\n            id\n            number\n            timestamp\n            parentHash\n            author\n            difficulty\n            totalDifficulty\n            gasUsed\n            gasLimit\n            receiptsRoot\n            transactionsRoot\n            stateRoot\n            size\n            unclesHash\n        }\n    }\n    "])), first);
    return query_str;
}
exports.getBlocksQuery = getBlocksQuery;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=QueryBuilder.js.map