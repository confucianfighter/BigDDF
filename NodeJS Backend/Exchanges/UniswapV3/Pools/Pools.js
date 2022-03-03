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
exports.sort_pools_by_token1_symbol = exports.sort_pools_by_token0_symbol = exports.sort_ids_func = exports.sort_pools_by_id_func = exports.verifyAllIDsPresent = exports.getIDsFromPoolList = exports.getPoolsByID = exports.getPoolByTokenMatch = exports.getPools = void 0;
/* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
var Pool_1 = require("./Pool");
var BlockHelper_1 = require("../../../GraphQL/Blocks/BlockHelper");
var QueryHelper_1 = require("../../../GraphQL/QueryHelper");
var PoolsQueryBuilder_1 = require("./PoolsQueryBuilder");
function getPools(first, orderBy, orderDirection) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, blocks, first_count_down, i, adjusted_first, skip_amount, query_str, pool_list, results, _i, results_1, result, _a, _b, poolData, pool;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    promises = [];
                    return [4 /*yield*/, new BlockHelper_1.BlockHelper().getBlocks(1)];
                case 1:
                    blocks = _c.sent();
                    first_count_down = first;
                    i = 0;
                    while (first_count_down > 0) {
                        adjusted_first = first_count_down < 1000 ? first_count_down : 1000;
                        skip_amount = 1000 * i;
                        query_str = (0, PoolsQueryBuilder_1.buildPoolsQuery)(adjusted_first, skip_amount, orderBy, orderDirection, undefined, blocks[0].number);
                        // send the query, store the promise, don't wait, move on
                        promises.push(QueryHelper_1.queryHelper.sendQuery(query_str));
                        // if this results in a negative number, we are done:
                        first_count_down -= 1000;
                        i++;
                    }
                    pool_list = [];
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    results = _c.sent();
                    for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                        result = results_1[_i];
                        for (_a = 0, _b = result.pools; _a < _b.length; _a++) {
                            poolData = _b[_a];
                            pool = new Pool_1.Pool(poolData);
                            pool_list = __spreadArray(__spreadArray([], pool_list, true), [pool], false);
                        }
                    }
                    return [2 /*return*/, pool_list];
            }
        });
    });
}
exports.getPools = getPools;
/*
Returns id list of all pools with specified coin name pair.
*/
function getPoolByTokenMatch(symbol_list, first) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var result, match_list, i, pool;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, getPools(first, 'volumeUSD', QueryHelper_1.OrderDirection.desc)];
                case 1:
                    result = _e.sent();
                    match_list = [];
                    for (i = 0; i < result.length; i++) {
                        pool = result[i];
                        if (((_a = pool.token0) === null || _a === void 0 ? void 0 : _a.symbol) === symbol_list[0] || ((_b = pool.token0) === null || _b === void 0 ? void 0 : _b.symbol) === symbol_list[1]) {
                            if (((_c = pool.token1) === null || _c === void 0 ? void 0 : _c.symbol) === symbol_list[0] || ((_d = pool.token1) === null || _d === void 0 ? void 0 : _d.symbol) === symbol_list[1]) {
                                match_list.push(pool);
                            }
                        }
                    }
                    return [2 /*return*/, match_list];
            }
        });
    });
}
exports.getPoolByTokenMatch = getPoolByTokenMatch;
/*Runs a pool query from a list of ids
    * can only run 100 at a time, so if there's more than 100,
    * this runs them all at once:*/
function getPoolsByID(ids_list) {
    return __awaiter(this, void 0, void 0, function () {
        var ids, blocks, result_list, promises, splice_amount, ids_fragment, i, id, query_str, results, _i, results_2, pool;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ids = __spreadArray([], ids_list, true);
                    return [4 /*yield*/, new BlockHelper_1.BlockHelper().getBlocks(1)];
                case 1:
                    blocks = _a.sent();
                    result_list = [];
                    promises = [];
                    while (ids.length > 0) {
                        splice_amount = ids.length >= 20 ? 20 : ids.length;
                        ids_fragment = [];
                        for (i = 0; i < splice_amount; i++) {
                            id = ids.pop();
                            ids_fragment.push(id);
                        }
                        query_str = (0, PoolsQueryBuilder_1.buildPoolsQuery)(undefined, undefined, undefined, undefined, ids_fragment, blocks[0].number);
                        // take the promise, don't wait
                        promises.push(QueryHelper_1.queryHelper.sendQuery(query_str));
                    }
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    results = _a.sent();
                    for (_i = 0, results_2 = results; _i < results_2.length; _i++) {
                        pool = results_2[_i];
                        // ... is called the spreader operator, just unpacks the list
                        result_list = __spreadArray(__spreadArray([], result_list, true), pool.pools, true);
                    }
                    //make sure everything matches:
                    return [4 /*yield*/, verifyAllIDsPresent(ids, result_list)];
                case 3:
                    //make sure everything matches:
                    _a.sent();
                    return [2 /*return*/, result_list];
            }
        });
    });
}
exports.getPoolsByID = getPoolsByID;
// Gets Pool IDs as a list of strings
function getIDsFromPoolList(pools) {
    var ids = [];
    for (var _i = 0, pools_1 = pools; _i < pools_1.length; _i++) {
        var pool = pools_1[_i];
        ids = __spreadArray(__spreadArray([], ids, true), [pool['id']], false);
    }
    return ids;
}
exports.getIDsFromPoolList = getIDsFromPoolList;
/* goes through id list and list of pools and makes sure it all matches*/
function verifyAllIDsPresent(ids, pools) {
    return __awaiter(this, void 0, void 0, function () {
        var ids_copy, pools_copy, i, list_id, pool_id;
        return __generator(this, function (_a) {
            ids_copy = __spreadArray([], ids, true);
            ids_copy = ids_copy.sort(sort_ids_func);
            pools_copy = __spreadArray([], pools, true);
            pools_copy = pools_copy.sort(sort_pools_by_id_func);
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
}
exports.verifyAllIDsPresent = verifyAllIDsPresent;
// same as above but id string is in an object:
function sort_pools_by_id_func(a, b) {
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
}
exports.sort_pools_by_id_func = sort_pools_by_id_func;
// sort function that sorts string guids
function sort_ids_func(aID, bID) {
    var aNum = parseInt(aID, 16);
    var bNum = parseInt(bID, 16);
    if (aNum > bNum)
        return 1;
    if (aNum < bNum)
        return -1;
    else
        return 0;
}
exports.sort_ids_func = sort_ids_func;
function sort_pools_by_token0_symbol(a, b) {
    if (a.token0.symbol > b.token0.symbol)
        return 1;
    else if (a.token0.symbol < b.token0.symbol)
        return -1;
    else
        return 0;
}
exports.sort_pools_by_token0_symbol = sort_pools_by_token0_symbol;
function sort_pools_by_token1_symbol(a, b) {
    if (a.token0.symbol > b.token0.symbol)
        return 1;
    else if (a.token0.symbol < b.token0.symbol)
        return -1;
    else
        return 0;
}
exports.sort_pools_by_token1_symbol = sort_pools_by_token1_symbol;
//# sourceMappingURL=Pools.js.map