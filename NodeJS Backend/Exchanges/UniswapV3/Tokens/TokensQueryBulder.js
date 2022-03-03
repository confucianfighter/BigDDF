"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildTokensQuery = void 0;
var graphql_request_1 = require("graphql-request");
var QueryBuilder_1 = require("../../../GraphQL/QueryBuilder");
function BuildTokensQuery(first, skip, orderBy, orderDirection, ids, block) {
    var idString = undefined;
    if (ids !== undefined)
        idString = (0, QueryBuilder_1.buildIDString)(ids);
    var query_str = (0, graphql_request_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{\n    tokens("], ["{\n    tokens("]))) +
        (idString ? "where: {id_in: ".concat(idString, "} ,") : "") +
        (first ? "first: ".concat(first, ", ") : "") +
        (skip ? "skip: ".concat(skip, ", ") : "") +
        (orderBy ? "orderBy: ".concat(orderBy, ",") : "") +
        (orderDirection ? "orderDirection: ".concat(orderDirection.toString(), " , ") : "") +
        (block ? "block: {number: ".concat(block, "} ,") : "") + ")\n        {\n                id #: ID!\n                symbol #: String!\n                name #: String!\n                decimals #: BigInt!\n                totalSupply #: BigInt!\n                volume #: BigDecimal!\n                volumeUSD #: BigDecimal!\n                untrackedVolumeUSD #: BigDecimal!\n                feesUSD #: BigDecimal!\n                txCount #: BigInt!\n                poolCount #: BigInt!\n                totalValueLocked #: BigDecimal!\n                totalValueLockedUSD #: BigDecimal!\n                totalValueLockedUSDUntracked #: BigDecimal!\n                derivedETH #: BigDecimal!\n                whitelistPools {\n                    id\n                    volumeUSD\n                }\n                tokenDayData {\n                    id\n                    date # ten digit number with no quotes\n                    volume\n                    volumeUSD\n                    untrackedVolumeUSD\n                    totalValueLocked\n                    totalValueLockedUSD\n                    priceUSD\n                    feesUSD\n                    open\n                    high\n                    low\n                    close\n                }  \n           }    \n    }";
    return query_str;
}
exports.BuildTokensQuery = BuildTokensQuery;
var templateObject_1;
//# sourceMappingURL=TokensQueryBulder.js.map