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
Object.defineProperty(exports, "__esModule", { value: true });
exports.go = void 0;
var postgres_1 = require("../../Database/postgres");
var Timer_1 = require("../../Utils/Timer");
var CoinGecko_1 = require("./CoinGecko");
/* This is the main loop for collecting coin data history from coin gecko.
* It's meant to run in it's own instance of node, on it's own in store all
* info in coin_history table in the DDF postgres database as well as general
* info about each coin in the coin_gecko_coins table.*/
function go() {
    return __awaiter(this, void 0, void 0, function () {
        var count, get_tokens_timer, first, coins, price_insertion_str, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    count = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 5];
                    console.log("Update count: " + count++);
                    get_tokens_timer = new Timer_1.Timer();
                    get_tokens_timer.start();
                    first = 5000;
                    return [4 /*yield*/, (0, CoinGecko_1.getAllTokenPrices)(first)];
                case 2:
                    coins = _a.sent();
                    // Check if all the coins we asked for are there:
                    if (coins.length !== first)
                        console.log("\n            Asked CoinGecko for ".concat(first, " coins but got back ").concat(coins.length, ".\n        "));
                    else
                        (console.log("Obtained all ".concat(first, " coins.")));
                    return [4 /*yield*/, buildPriceInsertionQuery(coins)];
                case 3:
                    price_insertion_str = _a.sent();
                    // Send the query:
                    console.log("Sending postgres coin_history insertion query.");
                    return [4 /*yield*/, (0, postgres_1.sendSQLQuery)(price_insertion_str)];
                case 4:
                    result = _a.sent();
                    console.log("Query complete.");
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.go = go;
function buildPriceInsertionQuery(coins) {
    return __awaiter(this, void 0, void 0, function () {
        var query_str, _i, coins_1, coin, line_item;
        return __generator(this, function (_a) {
            console.log("Building postgres coin_history insertion query.");
            query_str = "";
            for (_i = 0, coins_1 = coins; _i < coins_1.length; _i++) {
                coin = coins_1[_i];
                line_item = "\n            insert into coin_history (symbol, timestamp, price, total_volume, market_cap)\n            values(\n                '".concat(coin.symbol.replace("'", "''"), "', \n                '").concat(coin.last_updated, "', \n                 ").concat(coin.current_price, ",\n                 ").concat(coin.total_volume, ",\n                 ").concat(coin.market_cap, "\n            ) \n            on conflict do nothing;\n        ");
                query_str += line_item;
            }
            query_str += buildCoinGeckoCoinsInsertionString(coins);
            return [2 /*return*/, query_str];
        });
    });
}
function buildCoinGeckoCoinsInsertionString(coins) {
    var query_str = "";
    for (var _i = 0, coins_2 = coins; _i < coins_2.length; _i++) {
        var coin = coins_2[_i];
        var line_item = "\n            insert into coin_gecko_coin_info (\n                coin_id,\n                symbol,                         \n                name,                            \n                image,\n                last_updated,\n                current_price,                   \n                market_cap,                      \n                market_cap_rank,                 \n                fully_diluted_valuation,         \n                total_volume,        \n                high_24h,                        \n                low_24h,                         \n                price_change_24h,                \n                price_change_percentage_24h,     \n                market_cap_change_24h,           \n                market_cap_change_percentage_24h,\n                circulating_supply,              \n                total_supply,                    \n                max_supply,                      \n                ath,                             \n                ath_change_percentage,           \n                ath_date,                        \n                atl,                             \n                atl_change_percentage,           \n                atl_date\n            )\n            values(\n                '".concat(coin.id.replace("'", "''"), "',\n                '").concat(coin.symbol.replace("'", "''"), "',\n                '").concat(coin.name.replace("'", "''"), "',\n                '").concat(coin.image.replace("'", "''"), "',\n                '").concat(coin.last_updated, "',\n                ").concat(coin.current_price, ",\n                ").concat(coin.market_cap, ",\n                ").concat(coin.market_cap_rank, ",\n                ").concat(coin.fully_diluted_valuation, ",\n                ").concat(coin.total_volume, ",\n                ").concat(coin.high_24h, ",\n                ").concat(coin.low_24h, ",\n                ").concat(coin.price_change_24h, ",\n                ").concat(coin.price_change_percentage_24h, ",\n                ").concat(coin.market_cap_change_24h, ",\n                ").concat(coin.market_cap_change_percentage_24h, ",\n                ").concat(coin.circulating_supply, ",\n                ").concat(coin.total_supply, ",\n                ").concat(coin.max_supply, ",\n                ").concat(coin.ath, ",\n                ").concat(coin.ath_change_percentage, ",\n                '").concat(coin.ath_date, "',\n                ").concat(coin.atl, ",\n                ").concat(coin.atl_change_percentage, ",\n                '").concat(coin.atl_date, "'\n            ) \n            on conflict(coin_id)\n            do update \n                SET coin_id = '").concat(coin.id.replace("'", "''"), "',\n                symbol = '").concat(coin.symbol.replace("'", "''"), "',\n                name = '").concat(coin.name.replace("'", "''"), "',\n                image = '").concat(coin.image.replace("'", "''"), "',\n                last_updated = '").concat(coin.last_updated, "',\n                current_price = ").concat(coin.current_price, ",\n                market_cap = ").concat(coin.market_cap, ",\n                market_cap_rank = ").concat(coin.market_cap_rank, ",\n                fully_diluted_valuation = ").concat(coin.fully_diluted_valuation, ",\n                total_volume = ").concat(coin.total_volume, ",\n                high_24h = ").concat(coin.high_24h, ",\n                low_24h = ").concat(coin.low_24h, ",\n                price_change_24h = ").concat(coin.price_change_24h, ",\n                price_change_percentage_24h = ").concat(coin.price_change_percentage_24h, ",\n                market_cap_change_24h = ").concat(coin.market_cap_change_24h, ",\n                market_cap_change_percentage_24h = ").concat(coin.market_cap_change_percentage_24h, ",\n                circulating_supply = ").concat(coin.circulating_supply, ",\n                total_supply = ").concat(coin.total_supply, ",\n                max_supply = ").concat(coin.max_supply, ",\n                ath = ").concat(coin.ath, ",\n                ath_change_percentage = ").concat(coin.ath_change_percentage, ",\n                ath_date = '").concat(coin.ath_date, "',\n                atl = ").concat(coin.atl, ",\n                atl_change_percentage = ").concat(coin.atl_change_percentage, ",\n                atl_date = '").concat(coin.atl_date, "';\n            ");
        query_str += line_item;
    }
    return query_str;
}
go();
//# sourceMappingURL=coin-gecko-service.js.map