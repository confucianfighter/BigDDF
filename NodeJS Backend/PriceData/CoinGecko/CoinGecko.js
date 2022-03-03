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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicates = exports.sortCoinGeckoBySymbol = exports.checkForDuplicatesAndPriceVariation = exports.sortByID = exports.getAllTokenPrices = void 0;
// had to downgrade to earlier version of fetch:
// f*** node-fetch. Axios actually works!
var axios_1 = __importDefault(require("axios"));
var TimeUtils_1 = require("../../Utils/TimeUtils");
var delay_1 = require("../../Utils/delay");
// Gets data on as many tokens from CoinGecko as specified:
var success_count = 0;
function getAllTokenPrices(how_many) {
    return __awaiter(this, void 0, void 0, function () {
        var error_count, price_list, url, i, params, joined_params, url_params, result, axios_result, retry, delay_millis, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error_count = 0;
                    price_list = [];
                    url = "https://api.coingecko.com/api/v3/coins/markets?";
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < how_many / 250)) return [3 /*break*/, 10];
                    params = [
                        "vs_currency=usd",
                        "order=market_cap_desc",
                        "per_page=250",
                        "page=".concat(i),
                        "sparkline=false"
                    ];
                    joined_params = params.join('&');
                    url_params = url + joined_params;
                    // gather the promises, do not 'await':
                    console.log("Getting next 250 coins on page ".concat(i, " of ").concat(how_many / 250, "."));
                    result = [];
                    axios_result = {};
                    retry = true;
                    _a.label = 2;
                case 2:
                    if (!retry) return [3 /*break*/, 8];
                    delay_millis = 60000 / 50;
                    return [4 /*yield*/, (0, delay_1.delay)(delay_millis)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, axios_1.default.get(url_params)];
                case 5:
                    axios_result = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    retry = true;
                    error_count++;
                    console.log("Fetch request either timed out or network is down. Error name was ".concat(err_1.name));
                    console.log("Error count: " + error_count);
                    return [3 /*break*/, 7];
                case 7:
                    console.log("Error count: " + error_count);
                    retry = false;
                    return [3 /*break*/, 2];
                case 8:
                    result = axios_result.data;
                    if (result !== null && result !== undefined) {
                        price_list = __spreadArray(__spreadArray([], price_list, true), result, true);
                        success_count++;
                    }
                    else {
                        retry = true;
                    }
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 1];
                case 10:
                    //drum roll...
                    console.log("success count: " + success_count);
                    console.log("error count: " + error_count);
                    return [2 /*return*/, price_list];
            }
        });
    });
}
exports.getAllTokenPrices = getAllTokenPrices;
function sortByID(a, b) {
    // In Coin Gecko, they are giving names as the id. Maybe it is more unique than the actual 'name' property?
    if (a.id > b.id)
        return 1;
    else if (a.id < b.id)
        return -1;
    else
        return 0;
}
exports.sortByID = sortByID;
// There some 500 out of 5000 coins listed with duplicates. So far there hasn't been even a 1% difference
// in any of the prices they are giving, which is all we care about.
function checkForDuplicatesAndPriceVariation(list, throw_error_if_price_varies) {
    if (throw_error_if_price_varies === void 0) { throw_error_if_price_varies = false; }
    var thereWereDuplicates = false;
    var thePricesVaried = false;
    var list_copy = __spreadArray([], list, true);
    list_copy = list_copy.sort(sortByID);
    var passed = true;
    // Each duplicate message is added to this string as a list item:
    var error_str = "";
    // included in the message:
    var error_count = 0;
    //length must be at least two because we are popping then comparing:
    while (list_copy.length > 1) {
        // pop last item off the list:
        var a = list_copy.pop();
        // peek at the next item:
        var b = list_copy[list_copy.length - 1];
        var price_percent_difference = 0;
        // compare id and % price difference
        if (a.id === b.id) {
            thereWereDuplicates = true;
            price_percent_difference = (Math.abs(a.current_price - b.current_price) / a.current_price) * 100;
            if (price_percent_difference > 1) {
                error_count += 1;
                thePricesVaried = true;
                error_str = error_str + "\n                    Coin with id ".concat(a.id, " has a duplicate with mismatched prices.\n                    Price of first one is: ").concat(a.current_price, "\n                    Price of second one is: ").concat(b.current_price, "\n                    Price percent difference is: %").concat(price_percent_difference, "\n                    Last coin A update: ").concat(a.last_updated, "\n                    Last coin B update: ").concat(b.last_updated, "\n                ");
            }
        }
        a.PRICE_PERCENT_DIFFERENCE_AMONG_DUPLICATES = price_percent_difference;
        b.PRICE_PERCENT_DIFFERENCE_AMONG_DUPLICATES = price_percent_difference;
    }
    if (thePricesVaried && throw_error_if_price_varies) {
        error_str = "There were ".concat(error_count, " coins with duplicate symbols and the prices varied!.\n            ") + error_str;
        throw new Error(error_str);
    }
    // if we made it here, everything passed:
    else
        console.log("No duplicates found.");
    return [thereWereDuplicates, thereWereDuplicates];
}
exports.checkForDuplicatesAndPriceVariation = checkForDuplicatesAndPriceVariation;
function sortCoinGeckoBySymbol(a, b) {
    if (a.symbol > b.symbol)
        return 1;
    else if (a.symbol < b.symbol)
        return -1;
    else
        return 0;
}
exports.sortCoinGeckoBySymbol = sortCoinGeckoBySymbol;
function removeDuplicates(coins) {
    var coins_copy = __spreadArray([], coins.sort(sortByID), true);
    var return_coins = [];
    checkForDuplicatesAndPriceVariation(coins);
    // needs to be at least two coins so we can compare:
    while (coins_copy.length > 1) {
        var a = coins_copy.shift();
        while (true) {
            if (a.symbol === coins_copy[0].symbol) {
                var b_1 = coins_copy.shift();
                var time_a = a.last_updated;
                var time_b = b_1.last_updated;
                var time_difference = (0, TimeUtils_1.computeTimeElapsed)(time_a, time_b, TimeUtils_1.TimeUnits.millis);
                if (time_difference > 0) {
                    a = b_1;
                    continue;
                }
            }
            else
                break;
        }
        return_coins.push(a);
        var b = coins[0];
        if (a.symbol === b.symbol)
            coins_copy.shift();
    }
    var _a = checkForDuplicatesAndPriceVariation(return_coins), thereWereDuplicates = _a[0], thePricesVaried = _a[1];
    if (thereWereDuplicates)
        throw new Error("My God man! Remove Coin Gecko duplicate logic is not working!");
    else
        console.log("CoinGecko duplicates removed successfully.");
    return return_coins;
}
exports.removeDuplicates = removeDuplicates;
//# sourceMappingURL=CoinGecko.js.map