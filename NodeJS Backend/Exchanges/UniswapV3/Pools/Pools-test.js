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
exports.test = void 0;
var QueryHelper_1 = require("../../../GraphQL/QueryHelper");
var Pools_1 = require("./Pools");
var Timer_1 = require("../../../Utils/Timer");
function test(verbose) {
    if (verbose === void 0) { verbose = false; }
    return __awaiter(this, void 0, void 0, function () {
        var get_pools_timer, first, pools, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Starting Pools test:");
                    get_pools_timer = new Timer_1.Timer();
                    get_pools_timer.start();
                    first = 5000;
                    return [4 /*yield*/, (0, Pools_1.getPools)(first, 'volumeUSD', QueryHelper_1.OrderDirection.desc)];
                case 1:
                    pools = _a.sent();
                    message = "   Asked Pools.getPools for ".concat(first, " pools and got back ").concat(pools.length, ".");
                    if (pools.length !== first)
                        throw new Error(message);
                    else
                        (console.log(message + " Looks Good!"));
                    get_pools_timer.stop("Pools.getPools(".concat(first, ")"));
                    if (verbose)
                        console.log(pools);
                    console.log("   ...Finished Pools test.");
                    return [2 /*return*/];
            }
        });
    });
}
exports.test = test;
function testGetPoolsByID(pools) {
    return __awaiter(this, void 0, void 0, function () {
        var qh, id_list, fetched_pools;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    qh = new QueryHelper_1.QueryHelper();
                    id_list = (0, Pools_1.getIDsFromPoolList)(pools);
                    return [4 /*yield*/, (0, Pools_1.getPoolsByID)(id_list)];
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
                case 0: return [4 /*yield*/, (0, Pools_1.getPools)(first, orderBy, direction)];
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
function checkForDuplicatesById(list) {
    return __awaiter(this, void 0, void 0, function () {
        var duplicates_found, list_copy, item;
        return __generator(this, function (_a) {
            duplicates_found = false;
            list_copy = __spreadArray([], list, true);
            list_copy = list_copy.sort(Pools_1.sort_pools_by_id_func);
            //length must be 2 or greater because we are popping and comparing
            while (list_copy.length > 1) {
                item = list_copy.pop();
                // item shouldn't be null, compiler keeps complaining though
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
//# sourceMappingURL=Pools-test.js.map