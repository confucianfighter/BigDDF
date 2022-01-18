"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHelper = exports.OrderDirection = void 0;
var graphql_request_1 = require("graphql-request");
var all_queries_1 = require("./all-queries");
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["desc"] = "desc";
    OrderDirection["asc"] = "asc";
})(OrderDirection = exports.OrderDirection || (exports.OrderDirection = {}));
var QueryHelper = /** @class */ (function () {
    //QueryHelper Constructor, if there is already one, returns that instead:
    function QueryHelper(provider_url) {
        if (provider_url === void 0) { provider_url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'; }
        if (QueryHelper.Singleton === null) {
            this.provider_url = provider_url;
            QueryHelper.Singleton = this;
        }
        return QueryHelper.Singleton;
    }
    // Sends whatever raw GraphQL query string you give it:
    QueryHelper.prototype.sendQuery = function (query_str) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, graphql_request_1.request)(this.provider_url, query_str)
                            .then(function (result) {
                            return result;
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /* Returns id list of all pools with specified coin name pair.
     */
    QueryHelper.prototype.getPoolIdByCoinMatch = function (symbol_list, first) {
        return __awaiter(this, void 0, void 0, function () {
            var result, match_list, i, pool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPools(first, 'liquidity', OrderDirection.desc)];
                    case 1:
                        result = _a.sent();
                        match_list = [];
                        for (i = 0; i < result.length; i++) {
                            pool = result[i];
                            if (pool['token0']['symbol'] === symbol_list[0] || pool['token0']['symbol'] === symbol_list[1]) {
                                if (pool['token1']['symbol'] === symbol_list[0] || pool['token1']['symbol'] === symbol_list[1]) {
                                    match_list.push(pool);
                                }
                            }
                        }
                        return [2 /*return*/, match_list];
                }
            });
        });
    };
    /* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
    QueryHelper.prototype.getPools = function (first, orderBy, orderDirection) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, first_count_down, i, adjusted_first, skip_amount, query_str, pool_list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        first_count_down = first;
                        i = 0;
                        while (first_count_down > 0) {
                            adjusted_first = first_count_down < 1000 ? first_count_down : 1000;
                            skip_amount = 1000 * i;
                            query_str = (0, all_queries_1.pools_query)(adjusted_first, skip_amount, orderBy, orderDirection);
                            // send the query, store the promise, don't wait, move on
                            promises.push(this.sendQuery(query_str));
                            // if this results in a negative number, we are done:
                            first_count_down -= 1000;
                            i++;
                        }
                        pool_list = [];
                        return [4 /*yield*/, Promise.all(promises).then(function (results) {
                                for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                                    var result = results_1[_i];
                                    pool_list = __spreadArray(__spreadArray([], pool_list, true), result['pools'], true);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, pool_list];
                }
            });
        });
    };
    // Gets Pool IDs as a list of strings
    QueryHelper.prototype.getIDsFromPoolList = function (query_obj) {
        var ids = [];
        for (var _i = 0, query_obj_1 = query_obj; _i < query_obj_1.length; _i++) {
            var pool = query_obj_1[_i];
            ids = __spreadArray(__spreadArray([], ids, true), [pool['id']], false);
        }
        return ids;
    };
    /*Runs a pool query from a list of ids
    * can only run 100 at a time, so if there's more than 100,
    * this runs them all at once:*/
    QueryHelper.prototype.getPoolsByID = function (ids_list) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, result_list, promises, splice_amount, ids_fragment, i, id, query_str;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ids = __spreadArray([], ids_list, true);
                        result_list = [];
                        promises = [];
                        while (ids.length > 0) {
                            splice_amount = ids.length >= 100 ? 100 : ids.length;
                            ids_fragment = [];
                            for (i = 0; i < splice_amount; i++) {
                                id = ids.pop();
                                ids_fragment.push(id);
                            }
                            query_str = (0, all_queries_1.poolsByIDQuery)(ids_fragment);
                            // take the promise, don't wait
                            promises.push(this.sendQuery(query_str));
                        }
                        // now wait for all queries to finish and build the pools list:
                        return [4 /*yield*/, Promise.all(promises).then(function (results) {
                                for (var _i = 0, results_2 = results; _i < results_2.length; _i++) {
                                    var pool = results_2[_i];
                                    // ... is called the spreader operator, just unpacks the list
                                    result_list = __spreadArray(__spreadArray([], result_list, true), [pool['pools']], false);
                                }
                            })];
                    case 1:
                        // now wait for all queries to finish and build the pools list:
                        _a.sent();
                        //make sure everything matches:
                        return [4 /*yield*/, this.verifyAllIDsPresent(ids, result_list)];
                    case 2:
                        //make sure everything matches:
                        _a.sent();
                        return [2 /*return*/, result_list];
                }
            });
        });
    };
    /* goes through id list and list of pools and makes sure it all matches*/
    QueryHelper.prototype.verifyAllIDsPresent = function (ids, pools) {
        return __awaiter(this, void 0, void 0, function () {
            var ids_copy, pools_copy, i, list_id, pool_id;
            return __generator(this, function (_a) {
                ids_copy = __spreadArray([], ids, true);
                ids_copy = ids_copy.sort(this.sort_ids_func);
                pools_copy = __spreadArray([], pools, true);
                pools_copy = pools_copy.sort(this.sort_pools_by_id_func);
                for (i = 0; i < ids_copy.length; i++) {
                    list_id = ids_copy[i];
                    pool_id = pools_copy[i]['id'];
                    if (list_id !== pool_id) {
                        throw new Error("Failed to fetch all ids.");
                    }
                }
                console.log("Query fetched all ids correctly.");
                return [2 /*return*/];
            });
        });
    };
    // sort function that sorts string guids
    QueryHelper.prototype.sort_ids_func = function (aID, bID) {
        var aNum = parseInt(aID, 16);
        var bNum = parseInt(bID, 16);
        if (aNum > bNum)
            return 1;
        if (aNum < bNum)
            return -1;
        else
            return 0;
    };
    // same as above but id string is in an object:
    QueryHelper.prototype.sort_pools_by_id_func = function (a, b) {
        // convert to hex to make sure we are dealing with actual ids.
        var aID = a['id'];
        var bID = b['id'];
        var aNum = parseInt(aID, 16);
        var bNum = parseInt(bID, 16);
        if (aNum > bNum)
            return 1;
        if (aNum < bNum)
            return -1;
        else
            return 0;
    };
    // compiler won't recognize this function. Help!
    QueryHelper.prototype.isHexID = function (hex_str) {
        // take the 0x off the front:
        hex_str = hex_str.substring(2);
        // Regex that matches a hex string of 40 character
        var re = /[0-9A-Fa-f]{40}/g;
        // run the regex:
        if (!re.test(hex_str)) {
            throw new Error("String passed in is not in hex and is probably not a valid id");
        }
    };
    // not sure if this need to be a singleton:
    QueryHelper.Singleton = null;
    return QueryHelper;
}());
exports.QueryHelper = QueryHelper;
//# sourceMappingURL=gql-query-helper.js.map