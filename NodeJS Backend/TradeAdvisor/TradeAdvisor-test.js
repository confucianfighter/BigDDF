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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printItems = exports.test = void 0;
var CoinGecko_1 = require("../PriceData/CoinGecko/CoinGecko");
var emailer_1 = require("../Utils/MessageUtils/emailer");
var Tokens_1 = require("../Exchanges/UniswapV3/Tokens/Tokens");
var Timer_1 = require("../Utils/Timer");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var TimeUtils_1 = require("../Utils/TimeUtils");
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var data, x, y, z, w, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, CoinGecko_1.getAllTokenPrices)(5000)];
                case 1:
                    data = _c.sent();
                    data = (0, CoinGecko_1.removeDuplicates)(data);
                    x = 2;
                    y = 3;
                    z = x + y;
                    w = z + y;
                    console.log(w);
                    _a = emailer_1.sendEmail;
                    _b = [["ddfalerts@gmail.com"]];
                    return [4 /*yield*/, printItems(data)];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
exports.test = test;
function printItems(items) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenHash, result, header_str;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, Tokens_1.getTokenNameHash)(5000, 'volumeUSD')];
                case 1:
                    tokenHash = _a.sent();
                    Timer_1.timer.start();
                    result = "";
                    header_str = "<h1>Hot Coins:</h1>\n    ";
                    result = result + header_str;
                    items.forEach(function (token, i) {
                        var _a;
                        if (token.price_change_percentage_24h > 50
                            && tokenHash[token.symbol.toUpperCase()]) {
                            var fString = "  \n                    <h2>".concat(token.symbol.toUpperCase(), "</h2>\n                    <img src = \"").concat(token.image, "\" alt=\"\" width = \"50px\">\n                    <p>name: <em>").concat(token.name, "</em></p>               \n                    <p>price: <em>$").concat(token.current_price, "</em></p>\n                    <p>last updated: <em>").concat((0, moment_timezone_1.default)(token.last_updated).tz('America/New_York').format('MM/DD/YYYY hh:mma z'), "</em></p>\n                    <p>time since last update: <em> ").concat((_a = (0, TimeUtils_1.computeTimeElapsed)(new Date(token.last_updated), new Date(), TimeUtils_1.TimeUnits.minutes)) === null || _a === void 0 ? void 0 : _a.toPrecision(2), " minutes.</em></p>\n                    <p>24 hour percent increase: <em> ").concat(token.price_change_percentage_24h, "%</em></p>\n                    <p><a href=\"https://info.uniswap.org/#/tokens/").concat(tokenHash[token.symbol.toUpperCase()].id, "\">Uniswap V3 Info</a></p>\n                ");
                            result = result + fString;
                        }
                    });
                    Timer_1.timer.stop("Make print out", TimeUtils_1.TimeUnits.seconds);
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.printItems = printItems;
test();
//# sourceMappingURL=TradeAdvisor-test.js.map