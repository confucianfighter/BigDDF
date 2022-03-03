"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlocksQuery = exports.buildIDString = void 0;
var graphql_request_1 = require("graphql-request");
function buildIDString(ids) {
    var idString = "[";
    ids.map(function (address) {
        return (idString += "\"".concat(address, "\","));
    });
    idString += ']';
    return idString;
}
exports.buildIDString = buildIDString;
function getBlocksQuery(first) {
    var query_str = (0, graphql_request_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    {\n        blocks(first: ", ", skip: 0, orderBy: number, orderDirection: desc, where: {number_gt: 9300000}) {\n            id\n            number\n            timestamp\n            parentHash\n            author\n            difficulty\n            totalDifficulty\n            gasUsed\n            gasLimit\n            receiptsRoot\n            transactionsRoot\n            stateRoot\n            size\n            unclesHash\n        }\n    }\n    "], ["\n    {\n        blocks(first: ", ", skip: 0, orderBy: number, orderDirection: desc, where: {number_gt: 9300000}) {\n            id\n            number\n            timestamp\n            parentHash\n            author\n            difficulty\n            totalDifficulty\n            gasUsed\n            gasLimit\n            receiptsRoot\n            transactionsRoot\n            stateRoot\n            size\n            unclesHash\n        }\n    }\n    "])), first);
    return query_str;
}
exports.getBlocksQuery = getBlocksQuery;
var templateObject_1;
//# sourceMappingURL=QueryBuilder.js.map