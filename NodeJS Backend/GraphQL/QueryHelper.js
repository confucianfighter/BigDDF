"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var QueryBuilder = __importStar(require("./QueryBuilder"));
var Pool_1 = require("./Schema_Interfaces/Pool");
var BlockHelper_1 = require("./BlockHelper");
var CoinGecko_1 = require("./CoinGecko/CoinGecko");
var TimeUtils_1 = require("../Utils/TimeUtils");
var Timer_1 = require("../Utils/Timer");
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["desc"] = "desc";
    OrderDirection["asc"] = "asc";
})(OrderDirection = exports.OrderDirection || (exports.OrderDirection = {}));
var QueryHelper = /** @class */ (function () {
    //QueryHelper Constructor, if there is already one, returns that instead:
    function QueryHelper(provider_url) {
        if (provider_url === void 0) { provider_url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'; }
        // GraphQL provider url
        this.provider_url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
        if (QueryHelper.Singleton === null) {
            this.provider_url = provider_url;
            QueryHelper.Singleton = this;
        }
        return QueryHelper.Singleton;
    }
    // Sends whatever raw GraphQL query string you give it:
    QueryHelper.prototype.sendQuery = function (query_str, provider_url) {
        if (provider_url === void 0) { provider_url = this.provider_url; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, graphql_request_1.request)(provider_url, query_str)
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
    /* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
    QueryHelper.prototype.getPools = function (first, orderBy, orderDirection) {
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
                            query_str = QueryBuilder.Pools(adjusted_first, skip_amount, orderBy, orderDirection, undefined, blocks[0].number);
                            // send the query, store the promise, don't wait, move on
                            promises.push(this.sendQuery(query_str));
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
    };
    QueryHelper.prototype.getPoolsThatMatchCoinGecko = function (first, orderBy, direction) {
        var _a, _b;
        if (direction === void 0) { direction = OrderDirection.desc; }
        return __awaiter(this, void 0, void 0, function () {
            var return_pools, pools, coins, last_coin_symbol, _i, coins_1, coin, _c, pools_1, pool, _d, pools_2, pool, _e, coins_2, coin;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        return_pools = [];
                        return [4 /*yield*/, this.getPools(first, orderBy, direction)];
                    case 1:
                        pools = _f.sent();
                        return [4 /*yield*/, (0, CoinGecko_1.getAllTokenPrices)(first)];
                    case 2:
                        coins = _f.sent();
                        coins = coins.sort(CoinGecko_1.sortCoinGeckoBySymbol);
                        pools = pools.sort(this.sort_pools_by_token0_symbol);
                        last_coin_symbol = "";
                        for (_i = 0, coins_1 = coins; _i < coins_1.length; _i++) {
                            coin = coins_1[_i];
                            if (last_coin_symbol !== null) {
                                if (last_coin_symbol === coin.symbol) {
                                    continue;
                                }
                            }
                            last_coin_symbol = coin.symbol;
                            for (_c = 0, pools_1 = pools; _c < pools_1.length; _c++) {
                                pool = pools_1[_c];
                                if (((_a = pool.token0) === null || _a === void 0 ? void 0 : _a.symbol.toUpperCase()) === coin.symbol.toUpperCase()) {
                                    return_pools.push(pool);
                                }
                            }
                        }
                        pools = pools.sort(this.sort_pools_by_token1_symbol);
                        for (_d = 0, pools_2 = pools; _d < pools_2.length; _d++) {
                            pool = pools_2[_d];
                            for (_e = 0, coins_2 = coins; _e < coins_2.length; _e++) {
                                coin = coins_2[_e];
                                if (((_b = pool.token0) === null || _b === void 0 ? void 0 : _b.symbol.toUpperCase()) === coin.symbol.toUpperCase()) {
                                    coins.pop();
                                    return_pools.push(pool);
                                }
                            }
                        }
                        return [2 /*return*/, return_pools];
                }
            });
        });
    };
    QueryHelper.prototype.sort_pools_by_token0_symbol = function (a, b) {
        if (a.token0.symbol > b.token0.symbol)
            return 1;
        else if (a.token0.symbol < b.token0.symbol)
            return -1;
        else
            return 0;
    };
    QueryHelper.prototype.sort_pools_by_token1_symbol = function (a, b) {
        if (a.token0.symbol > b.token0.symbol)
            return 1;
        else if (a.token0.symbol < b.token0.symbol)
            return -1;
        else
            return 0;
    };
    /* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
    QueryHelper.prototype.getTokens = function (first, orderBy, orderDirection) {
        return __awaiter(this, void 0, void 0, function () {
            var blocks, promises, first_count_down, i, adjusted_first, skip_amount, query_str, token_list, results, _i, results_2, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, new BlockHelper_1.BlockHelper().getBlocks(1)];
                    case 1:
                        blocks = _a.sent();
                        Timer_1.timer.start("getTokens");
                        promises = [];
                        first_count_down = first;
                        i = 0;
                        while (first_count_down > 0) {
                            adjusted_first = first_count_down < 1000 ? first_count_down : 1000;
                            skip_amount = 1000 * i;
                            query_str = QueryBuilder.Tokens(adjusted_first, skip_amount, orderBy, orderDirection, undefined, blocks[0].number);
                            // send the query, store the promise, don't wait, move on
                            promises.push(this.sendQuery(query_str));
                            // if this results in a negative number, we are done:
                            first_count_down -= 1000;
                            i++;
                        }
                        token_list = [];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        results = _a.sent();
                        for (_i = 0, results_2 = results; _i < results_2.length; _i++) {
                            result = results_2[_i];
                            token_list = __spreadArray(__spreadArray([], token_list, true), result.tokens, true);
                        }
                        Timer_1.timer.stop();
                        return [2 /*return*/, token_list];
                }
            });
        });
    };
    QueryHelper.prototype.getTokenNameHash = function (first, orderBy, direction) {
        if (direction === void 0) { direction = OrderDirection.desc; }
        return __awaiter(this, void 0, void 0, function () {
            var tokenHash, tokens, _i, tokens_1, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenHash = {};
                        return [4 /*yield*/, this.getTokens(first, orderBy, direction)];
                    case 1:
                        tokens = _a.sent();
                        Timer_1.timer.start("Just making the token hash", TimeUtils_1.TimeUnits.seconds);
                        for (_i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                            token = tokens_1[_i];
                            tokenHash[token.symbol.toUpperCase()] = token;
                        }
                        Timer_1.timer.stop();
                        return [2 /*return*/, tokenHash];
                }
            });
        });
    };
    QueryHelper.prototype.getTokenDayData = function (first, orderBy, orderDirection) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, blocks, first_count_down, i, adjusted_first, skip_amount, query_str, tokenDayDatas, results, _i, results_3, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        return [4 /*yield*/, new BlockHelper_1.BlockHelper().getBlocks(1)];
                    case 1:
                        blocks = _a.sent();
                        first_count_down = first;
                        i = 0;
                        while (first_count_down > 0) {
                            adjusted_first = first_count_down < 1000 ? first_count_down : 1000;
                            skip_amount = 1000 * i;
                            query_str = QueryBuilder.TokenDayDatas(adjusted_first, skip_amount, orderBy, orderDirection, undefined, blocks[0].number);
                            // send the query, store the promise, don't wait, move on
                            promises.push(this.sendQuery(query_str));
                            // if this results in a negative number, we are done:
                            first_count_down -= 1000;
                            i++;
                        }
                        tokenDayDatas = [];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        results = _a.sent();
                        for (_i = 0, results_3 = results; _i < results_3.length; _i++) {
                            result = results_3[_i];
                            tokenDayDatas = __spreadArray(__spreadArray([], tokenDayDatas, true), result.tokenDayDatas, true);
                        }
                        return [2 /*return*/, tokenDayDatas];
                }
            });
        });
    };
    QueryHelper.prototype.getTokenHourData = function (first, orderBy, orderDirection) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, blocks, first_count_down, i, adjusted_first, skip_amount, block, query_str, tokenHourDatas, results, _i, results_4, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        return [4 /*yield*/, new BlockHelper_1.BlockHelper().getBlocks(1)];
                    case 1:
                        blocks = _a.sent();
                        first_count_down = first;
                        i = 0;
                        while (first_count_down > 0) {
                            adjusted_first = first_count_down < 1000 ? first_count_down : 1000;
                            skip_amount = 1000 * i;
                            block = blocks[0].number - 1;
                            query_str = QueryBuilder.TokenHourDatas(adjusted_first, skip_amount, orderBy, orderDirection, undefined, block);
                            // send the query, store the promise, don't wait, move on
                            promises.push(this.sendQuery(query_str));
                            // if this results in a negative number, we are done:
                            first_count_down -= 1000;
                            i++;
                        }
                        tokenHourDatas = [];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        results = _a.sent();
                        for (_i = 0, results_4 = results; _i < results_4.length; _i++) {
                            result = results_4[_i];
                            tokenHourDatas = __spreadArray(__spreadArray([], tokenHourDatas, true), result.tokenHourDatas, true);
                        }
                        return [2 /*return*/, tokenHourDatas];
                }
            });
        });
    };
    /* Returns id list of all pools with specified coin name pair.
     */
    QueryHelper.prototype.getPoolByTokenMatch = function (symbol_list, first) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var result, match_list, i, pool;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.getPools(first, 'volumeUSD', OrderDirection.desc)];
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
    };
    // Gets Pool IDs as a list of strings
    QueryHelper.prototype.getIDsFromPoolList = function (pools) {
        var ids = [];
        for (var _i = 0, pools_3 = pools; _i < pools_3.length; _i++) {
            var pool = pools_3[_i];
            ids = __spreadArray(__spreadArray([], ids, true), [pool['id']], false);
        }
        return ids;
    };
    /*Runs a pool query from a list of ids
    * can only run 100 at a time, so if there's more than 100,
    * this runs them all at once:*/
    QueryHelper.prototype.getPoolsByID = function (ids_list) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, blocks, result_list, promises, splice_amount, ids_fragment, i, id, query_str, results, _i, results_5, pool;
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
                            query_str = QueryBuilder.Pools(undefined, undefined, undefined, undefined, ids_fragment, blocks[0].number);
                            // take the promise, don't wait
                            promises.push(this.sendQuery(query_str));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        results = _a.sent();
                        for (_i = 0, results_5 = results; _i < results_5.length; _i++) {
                            pool = results_5[_i];
                            // ... is called the spreader operator, just unpacks the list
                            result_list = __spreadArray(__spreadArray([], result_list, true), pool.pools, true);
                        }
                        //make sure everything matches:
                        return [4 /*yield*/, this.verifyAllIDsPresent(ids, result_list)];
                    case 3:
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
        // Regex that matches a hex string of 40 characters
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
//# sourceMappingURL=QueryHelper.js.map