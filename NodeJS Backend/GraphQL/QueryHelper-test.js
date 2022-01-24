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
var Pool_1 = require("./Schema_Interfaces/Pool");
var print_json_tree_1 = require("../Utils/print_json_tree");
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var qh, pools, wethPool;
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
                    testGetTokenDayDatas(100);
                    qh = new QueryHelper_1.QueryHelper();
                    return [4 /*yield*/, qh.getPoolByTokenMatch(['WETH', 'USDT'], 20)];
                case 1:
                    pools = _a.sent();
                    wethPool = pools[0];
                    console.log("Price of WETH is " + Pool_1.Pool.getETHPriceUSD(wethPool));
                    return [2 /*return*/];
            }
        });
    });
}
// return string is print data generated by the test.
function testGetTokenHourDatas(how_many_print) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var qh, tokenHourDatas, list_print_str, i, message;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    qh = new QueryHelper_1.QueryHelper();
                    return [4 /*yield*/, qh.getTokenHourData(5, 'volumeUSD', QueryHelper_1.OrderDirection.desc)];
                case 1:
                    tokenHourDatas = _d.sent();
                    list_print_str = "";
                    for (i = 0; i < how_many_print; i++) {
                        list_print_str +=
                            "Token: ".concat((_a = tokenHourDatas[i].token) === null || _a === void 0 ? void 0 : _a.symbol, "\n            id: ").concat((_b = tokenHourDatas[i].token) === null || _b === void 0 ? void 0 : _b.id, "\n            priceUSD: ").concat(tokenHourDatas[i].priceUSD, "\n            volumeUSD: ").concat(tokenHourDatas[i].volumeUSD, "\n            number of pools: ").concat((_c = tokenHourDatas[i].token) === null || _c === void 0 ? void 0 : _c.poolCount, "\n         ");
                    }
                    message = " tokenHourDatas:\n    " + "total items: ".concat(tokenHourDatas.length, "\n    ") + "".concat(list_print_str.toString(), " \n    ");
                    console.log(message);
                    console.log((0, print_json_tree_1.print_json_tree)(tokenHourDatas[0], " "));
                    console.log(tokenHourDatas);
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