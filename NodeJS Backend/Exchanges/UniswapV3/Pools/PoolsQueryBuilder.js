"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPoolsQuery = void 0;
var graphql_request_1 = require("graphql-request");
var QueryBuilder_1 = require("../../../GraphQL/QueryBuilder");
function buildPoolsQuery(first, skip, orderBy, orderDirection, ids, block) {
    var idString = undefined;
    if (ids !== undefined) {
        idString = (0, QueryBuilder_1.buildIDString)(ids);
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
exports.buildPoolsQuery = buildPoolsQuery;
var templateObject_1;
//# sourceMappingURL=PoolsQueryBuilder.js.map