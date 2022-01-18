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
var gql_query_helper_1 = require("./gql-query-helper");
var moment = require("moment-timezone");
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var qh, result, _i, result_1, pool, pool_match_list, _a, pool_match_list_1, match, match_id, before, now, id_list, fetched_pools;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    qh = new gql_query_helper_1.QueryHelper();
                    return [4 /*yield*/, qh.getPools(5000, "volumeUSD", gql_query_helper_1.OrderDirection.desc)];
                case 1:
                    result = _b.sent();
                    console.log("There are ".concat(result.length, " pools."));
                    for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                        pool = result_1[_i];
                        console.log("\n        Pool ID: ".concat(pool['id'], "\n        1 ").concat(pool['token0']['symbol'], " is worth ").concat(pool['token1Price'], " ").concat(pool['token1']['symbol'], "\n        1 ").concat(pool['token1']['symbol'], " is worth ").concat(pool['token0Price'], " ").concat(pool['token0']['symbol']));
                    }
                    return [4 /*yield*/, qh.getPoolIdByCoinMatch(['WETH', 'DAI'], 1000)];
                case 2:
                    pool_match_list = _b.sent();
                    for (_a = 0, pool_match_list_1 = pool_match_list; _a < pool_match_list_1.length; _a++) {
                        match = pool_match_list_1[_a];
                        match_id = match['id'];
                        console.log("Matched pool id is ".concat(match_id));
                    }
                    return [4 /*yield*/, checkForDuplicatesById(pool_match_list)];
                case 3:
                    _b.sent();
                    before = moment('2022-01-13T12:00:00Z');
                    now = moment(new Date());
                    console.log(now.tz('America/New_York').format('MM/DD/YYYY h:ma z'));
                    return [4 /*yield*/, qh.getIDsFromPoolList(result)];
                case 4:
                    id_list = _b.sent();
                    return [4 /*yield*/, qh.getPoolsByID(id_list)];
                case 5:
                    fetched_pools = _b.sent();
                    console.log("id_list: " + "\n" +
                        id_list + "\n" +
                        "fetched_pools:" + '\n');
                    console.log(fetched_pools);
                    console.log("Pools length is: " + result.length);
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
            list_copy = list_copy.sort(new gql_query_helper_1.QueryHelper().sort_pools_by_id_func);
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
//# sourceMappingURL=gql-query-helper-test.js.map