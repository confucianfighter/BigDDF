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
var QueryHelper_1 = require("./QueryHelper");
var print_json_tree_1 = require("../Utils/print_json_tree");
function test() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //let qh: QueryHelper = new QueryHelper();
                //const result = await qh.getPools(5000, "volumeUSD", OrderDirection.desc );
                //console.log(`There are ${result.length} pools.`);
                //for(let pool of result) {
                //    console.log(`
                //    Pool ID: ${pool['id']}
                //    1 ${pool['token0']['symbol']} is worth ${pool['token1Price']} ${pool['token1']['symbol']}
                //    1 ${pool['token1']['symbol']} is worth ${pool['token0Price']} ${pool['token0']['symbol']}`);
                //}
                //
                //let pool_match_list: object[] = await qh.getPoolIdByCoinMatch(['WETH','DAI'],1000);
                //for(let match of pool_match_list) {
                //    let match_id = match['id'];
                //    console.log(`Matched pool id is ${match_id}`);
                //}
                //await checkForDuplicatesById(pool_match_list);
                //let before = moment('2022-01-13T12:00:00Z')
                //let  = moment(new Date());
                //console.log(now.tz('America/New_York').format('MM/DD/YYYY h:ma z'));
                //testGetPoolsByID(result);
                //testGetTokenHourDatas(5);
                //testGetTokenDayDatas(100);
                // trying to get price of weth usd, it depends if weth is defined as token0 or token1 in the match.
                //await testGetTokens(5000,'PLU');
                //await testGetPools(10, 'volumeUSD', OrderDirection.desc);
                return [4 /*yield*/, testPoolsByCoinGeckoMatch(1000, "volumeUSD")];
                case 1:
                    //let qh: QueryHelper = new QueryHelper();
                    //const result = await qh.getPools(5000, "volumeUSD", OrderDirection.desc );
                    //console.log(`There are ${result.length} pools.`);
                    //for(let pool of result) {
                    //    console.log(`
                    //    Pool ID: ${pool['id']}
                    //    1 ${pool['token0']['symbol']} is worth ${pool['token1Price']} ${pool['token1']['symbol']}
                    //    1 ${pool['token1']['symbol']} is worth ${pool['token0Price']} ${pool['token0']['symbol']}`);
                    //}
                    //
                    //let pool_match_list: object[] = await qh.getPoolIdByCoinMatch(['WETH','DAI'],1000);
                    //for(let match of pool_match_list) {
                    //    let match_id = match['id'];
                    //    console.log(`Matched pool id is ${match_id}`);
                    //}
                    //await checkForDuplicatesById(pool_match_list);
                    //let before = moment('2022-01-13T12:00:00Z')
                    //let  = moment(new Date());
                    //console.log(now.tz('America/New_York').format('MM/DD/YYYY h:ma z'));
                    //testGetPoolsByID(result);
                    //testGetTokenHourDatas(5);
                    //testGetTokenDayDatas(100);
                    // trying to get price of weth usd, it depends if weth is defined as token0 or token1 in the match.
                    //await testGetTokens(5000,'PLU');
                    //await testGetPools(10, 'volumeUSD', OrderDirection.desc);
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// return string is print data generated by the test.
function testGetTokens(first, token_symbol, orderBy, direction) {
    if (token_symbol === void 0) { token_symbol = ""; }
    if (orderBy === void 0) { orderBy = 'symbol'; }
    if (direction === void 0) { direction = QueryHelper_1.OrderDirection.desc; }
    return __awaiter(this, void 0, void 0, function () {
        var qh, tokens, output_str, found_it, _i, tokens_1, token, i, token, pools, j, pool;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    qh = new QueryHelper_1.QueryHelper();
                    return [4 /*yield*/, qh.getTokens(first, orderBy, direction)];
                case 1:
                    tokens = _a.sent();
                    output_str = "";
                    if (token_symbol != "") {
                        found_it = false;
                        for (_i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                            token = tokens_1[_i];
                            if (token.symbol === token_symbol) {
                                found_it = true;
                                output_str += "\n                    Found token ".concat(token.symbol, "!");
                            }
                        }
                        if (!found_it)
                            output_str += "\n            Searched ".concat(first, " tokens.\n            Couldn't find token ").concat(token_symbol);
                    }
                    else {
                        for (i = 0; i < tokens.length; i++) {
                            token = tokens[i];
                            output_str += "\n        \n            Token name: ".concat(token.name, "\n            Token symbol: ").concat(token.symbol, "\n            Token id: ").concat(token.id, "\n            White list pools:");
                            pools = token.whitelistPools;
                            for (j = 0; j < pools.length; j++) {
                                pool = pools[j];
                                output_str += "\n                ".concat(pool.id);
                            }
                        }
                    }
                    console.log(output_str);
                    return [2 /*return*/];
            }
        });
    });
}
function testGetTokenHourDatas(how_many_print, symbol_to_search) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (symbol_to_search === void 0) { symbol_to_search = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var qh, tokenHourDatas, list_print_str, found_item, _i, tokenHourDatas_1, hour_datas, i, message;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    qh = new QueryHelper_1.QueryHelper();
                    return [4 /*yield*/, qh.getTokenHourData(how_many_print, 'volumeUSD', QueryHelper_1.OrderDirection.desc)];
                case 1:
                    tokenHourDatas = _h.sent();
                    list_print_str = "";
                    if (symbol_to_search != "") {
                        found_item = false;
                        for (_i = 0, tokenHourDatas_1 = tokenHourDatas; _i < tokenHourDatas_1.length; _i++) {
                            hour_datas = tokenHourDatas_1[_i];
                            if (((_a = hour_datas.token) === null || _a === void 0 ? void 0 : _a.symbol) === symbol_to_search) {
                                found_item = true;
                                list_print_str +=
                                    "Found it!\n                       Token: ".concat((_b = hour_datas.token) === null || _b === void 0 ? void 0 : _b.symbol, "\n                            id: ").concat((_c = hour_datas.token) === null || _c === void 0 ? void 0 : _c.id, "\n                            priceUSD: ").concat(hour_datas.priceUSD, "\n                            volumeUSD: ").concat(hour_datas.volumeUSD, "\n                            number of pools: ").concat((_d = hour_datas.token) === null || _d === void 0 ? void 0 : _d.poolCount, "\n                     ");
                            }
                        }
                        if (!found_item) {
                            list_print_str += "Could not find token with symbol: ".concat(symbol_to_search);
                        }
                    }
                    else {
                        for (i = 0; i < how_many_print; i++) {
                            list_print_str +=
                                "Token: ".concat((_e = tokenHourDatas[i].token) === null || _e === void 0 ? void 0 : _e.symbol, "\n            id: ").concat((_f = tokenHourDatas[i].token) === null || _f === void 0 ? void 0 : _f.id, "\n            priceUSD: ").concat(tokenHourDatas[i].priceUSD, "\n            volumeUSD: ").concat(tokenHourDatas[i].volumeUSD, "\n            number of pools: ").concat((_g = tokenHourDatas[i].token) === null || _g === void 0 ? void 0 : _g.poolCount, "\n         ");
                        }
                    }
                    message = " tokenHourDatas:\n    " + "total items: ".concat(tokenHourDatas.length, "\n    ") + "".concat(list_print_str.toString(), " \n    ");
                    console.log(message);
                    return [2 /*return*/, message];
            }
        });
    });
}
// return string is print data generated by the test.
function testGetTokenDayDatas(how_many_print) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var qh, tokenDayDatas, list_print_str, i, message;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    qh = new QueryHelper_1.QueryHelper();
                    return [4 /*yield*/, qh.getTokenDayData(100, 'volumeUSD', QueryHelper_1.OrderDirection.desc)];
                case 1:
                    tokenDayDatas = _d.sent();
                    list_print_str = "";
                    for (i = 0; i < how_many_print; i++) {
                        list_print_str +=
                            "Token: ".concat((_a = tokenDayDatas[i].token) === null || _a === void 0 ? void 0 : _a.symbol, "\n            id: ").concat((_b = tokenDayDatas[i].token) === null || _b === void 0 ? void 0 : _b.id, "\n            priceUSD: ").concat(tokenDayDatas[i].priceUSD, "\n            volumeUSD: ").concat(tokenDayDatas[i].volumeUSD, "\n            number of pools: ").concat((_c = tokenDayDatas[i].token) === null || _c === void 0 ? void 0 : _c.poolCount, "\n         ");
                    }
                    message = " tokenDayDatas:\n    " + "total items: ".concat(tokenDayDatas.length, "\n    ") + "".concat(list_print_str.toString(), " \n    ");
                    console.log(message);
                    console.log((0, print_json_tree_1.print_json_tree)(tokenDayDatas[0], " "));
                    return [2 /*return*/, message];
            }
        });
    });
}
function testGetPoolsByID(pools) {
    return __awaiter(this, void 0, void 0, function () {
        var qh, id_list, fetched_pools;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    qh = new QueryHelper_1.QueryHelper();
                    id_list = qh.getIDsFromPoolList(pools);
                    return [4 /*yield*/, qh.getPoolsByID(id_list)];
                case 1:
                    fetched_pools = _a.sent();
                    //console.log("id_list: " + "\n" +
                    //    id_list + "\n" +
                    //    "fetched_pools:" + '\n' );
                    //console.log(fetched_pools);
                    console.log("Pools length is: " + fetched_pools.length);
                    return [2 /*return*/, fetched_pools];
            }
        });
    });
}
function testGetPools(first, orderBy, direction) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _i, data_1, pool;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new QueryHelper_1.QueryHelper().getPools(first, orderBy, direction)];
                case 1:
                    data = _a.sent();
                    for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                        pool = data_1[_i];
                        console.log(pool.print());
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function testPoolsByCoinGeckoMatch(first, orderBy, direction) {
    if (direction === void 0) { direction = QueryHelper_1.OrderDirection.desc; }
    return __awaiter(this, void 0, void 0, function () {
        var data, _i, data_2, pool;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new QueryHelper_1.QueryHelper().getPoolsThatMatchCoinGecko(first, orderBy, direction)];
                case 1:
                    data = _a.sent();
                    for (_i = 0, data_2 = data; _i < data_2.length; _i++) {
                        pool = data_2[_i];
                        console.log(pool.print());
                    }
                    console.log("number of pools ".concat(data.length));
                    return [2 /*return*/];
            }
        });
    });
}
// Test if queries ever return duplicates:
function checkForDuplicatesById(list) {
    return __awaiter(this, void 0, void 0, function () {
        var duplicates_found, list_copy, item;
        return __generator(this, function (_a) {
            duplicates_found = false;
            list_copy = __spreadArray([], list, true);
            list_copy = list_copy.sort(new QueryHelper_1.QueryHelper().sort_pools_by_id_func);
            //length must be 2 or greater because we are popping and comparing
            while (list_copy.length > 1) {
                item = list_copy.pop();
                // item shouldn't be null, compiler keeps complaining though
                // @ts-ignore
                if (item['id'] === list_copy[list_copy.length - 1]['id']) {
                    duplicates_found = true;
                    throw new Error("Found duplicates ids in list. Something may or may not be wrong with that.");
                }
            }
            if (!duplicates_found)
                console.log('No duplicate pool ids found.');
            return [2 /*return*/];
        });
    });
}
test();
//# sourceMappingURL=QueryHelper-test.js.map