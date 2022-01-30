"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocksQuery = exports.buildIDString = exports.TokenDayDatas = void 0;
var graphql_request_1 = require("graphql-request");
function TokenDayDatas(first, skip, orderBy, orderDirection, ids, block) {
    var idString = undefined;
    // @ts-ignore
    if (ids !== undefined)
        idString = buildIDString(ids);
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
function buildIDString(ids) {
    var idString = "[";
    // @ts-ignore -- already checking
    ids.map(function (address) {
        return (idString += "\"".concat(address, "\","));
    });
    idString += ']';
    return idString;
}
exports.buildIDString = buildIDString;
function getBlocksQuery(first) {
    var query_str = (0, graphql_request_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    {\n        blocks(first: ", ", skip: 0, orderBy: number, orderDirection: desc, where: {number_gt: 9300000}) {\n            id\n            number\n            timestamp\n            parentHash\n            author\n            difficulty\n            totalDifficulty\n            gasUsed\n            gasLimit\n            receiptsRoot\n            transactionsRoot\n            stateRoot\n            size\n            unclesHash\n        }\n    }\n    "], ["\n    {\n        blocks(first: ", ", skip: 0, orderBy: number, orderDirection: desc, where: {number_gt: 9300000}) {\n            id\n            number\n            timestamp\n            parentHash\n            author\n            difficulty\n            totalDifficulty\n            gasUsed\n            gasLimit\n            receiptsRoot\n            transactionsRoot\n            stateRoot\n            size\n            unclesHash\n        }\n    }\n    "])), first);
    return query_str;
}
exports.getBlocksQuery = getBlocksQuery;
var templateObject_1, templateObject_2;
//# sourceMappingURL=QueryBuilder.js.map