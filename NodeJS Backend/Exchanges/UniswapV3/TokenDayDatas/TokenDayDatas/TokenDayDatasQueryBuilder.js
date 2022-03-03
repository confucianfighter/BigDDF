"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDayDatas = void 0;
var graphql_request_1 = require("graphql-request");
var QueryBuilder_1 = require("../../../../GraphQL/QueryBuilder");
function TokenDayDatas(first, skip, orderBy, orderDirection, ids, block) {
    var idString = undefined;
    if (ids !== undefined)
        idString = (0, QueryBuilder_1.buildIDString)(ids);
    var query_str = (0, graphql_request_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{\n    tokenDayDatas("], ["{\n    tokenDayDatas("]))) +
        (idString ? "where: {id_in: ".concat(idString, "} ,") : "") +
        (first ? "first: ".concat(first, ", ") : "") +
        (skip ? "skip: ".concat(skip, ", ") : "") +
        (orderBy ? "orderBy: ".concat(orderBy, ",") : "") +
        (orderDirection ? "orderDirection: ".concat(orderDirection.toString(), " , ") : "") +
        (block ? "block: {number: ".concat(block, "} ,") : "") + ")\n        {\n            id #: ID!\n            date #: Int!\n            token \n            {\n                id\n                symbol\n                poolCount\n            }\n            volume #: BigDecimal!\n            volumeUSD #: BigDecimal!\n            untrackedVolumeUSD #: BigDecimal!\n            totalValueLocked #: BigDecimal!\n            totalValueLockedUSD #: BigDecimal!\n            priceUSD #: BigDecimal!\n            feesUSD #: BigDecimal!\n            open #: BigDecimal!\n            high #: BigDecimal!\n            low #: BigDecimal!\n            close #: BigDecimal!\n        }\n    }";
    return query_str;
}
exports.TokenDayDatas = TokenDayDatas;
var templateObject_1;
//# sourceMappingURL=TokenDayDatasQueryBuilder.js.map