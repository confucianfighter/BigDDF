"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolsByIDQuery = exports.pools_query = void 0;
var graphql_request_1 = require("graphql-request");
function pools_query(first, skip, orderBy, orderDirection) {
    if (orderDirection === void 0) { orderDirection = 'desc'; }
    var query_str = (0, graphql_request_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{\n    pools(first: ", ", skip:", ", orderBy:", ", orderDirection:", ")\n           {\n               id\n               liquidity\n               volumeUSD\n               token0\n               {\n                   id\n                   symbol\n               }\n               token1\n               {\n                   id\n                   symbol\n               }\n               token0Price\n               token1Price\n               txCount\n               liquidityProviderCount   \n           }    \n    }"], ["{\n    pools(first: ", ", skip:", ", orderBy:", ", orderDirection:", ")\n           {\n               id\n               liquidity\n               volumeUSD\n               token0\n               {\n                   id\n                   symbol\n               }\n               token1\n               {\n                   id\n                   symbol\n               }\n               token0Price\n               token1Price\n               txCount\n               liquidityProviderCount   \n           }    \n    }"])), first, skip, orderBy, orderDirection.toString());
    return query_str;
}
exports.pools_query = pools_query;
function poolsByIDQuery(ids, block) {
    var poolString = "[";
    ids.map(function (address) {
        return (poolString += "\"".concat(address, "\","));
    });
    poolString += ']';
    var queryString = "\n    query pools {\n      pools(where: {id_in: ".concat(poolString, "},") +
        (block ? "block: {number: ".concat(block, "} ,") : "") +
        " orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {\n        id\n        feeTier\n        liquidity\n        sqrtPrice\n        tick\n        token0 {\n            id\n            symbol\n            name\n            decimals\n            derivedETH\n        }\n        token1 {\n            id\n            symbol\n            name\n            decimals\n            derivedETH\n        }\n        token0Price\n        token1Price\n        volumeUSD\n        txCount\n        totalValueLockedToken0\n        totalValueLockedToken1\n        totalValueLockedUSD\n      }\n    }\n    ";
    return (queryString);
}
exports.poolsByIDQuery = poolsByIDQuery;
var templateObject_1;
//# sourceMappingURL=all-queries.js.map