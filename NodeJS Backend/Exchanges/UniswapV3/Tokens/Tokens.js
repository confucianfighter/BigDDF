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
exports.getTokenNameHash = exports.getTokens = void 0;
var BlockHelper_1 = require("../../../GraphQL/Blocks/BlockHelper");
var Timer_1 = require("../../../Utils/Timer");
var TimeUtils_1 = require("../../../Utils/TimeUtils");
var QueryHelper_1 = require("../../../GraphQL/QueryHelper");
var TokensQueryBulder_1 = require("./TokensQueryBulder");
/* Gets a list of Uniswap V3 Pools. Any number of them instead of just 1000 */
function getTokens(first, orderBy, orderDirection) {
    return __awaiter(this, void 0, void 0, function () {
        var blocks, promises, first_count_down, i, adjusted_first, skip_amount, query_str, token_list, results, _i, results_1, result;
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
                        query_str = (0, TokensQueryBulder_1.BuildTokensQuery)(adjusted_first, skip_amount, orderBy, orderDirection, undefined, blocks[0].number);
                        // send the query, store the promise, don't wait, move on
                        promises.push(QueryHelper_1.queryHelper.sendQuery(query_str));
                        // if this results in a negative number, we are done:
                        first_count_down -= 1000;
                        i++;
                    }
                    token_list = [];
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    results = _a.sent();
                    for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                        result = results_1[_i];
                        token_list = __spreadArray(__spreadArray([], token_list, true), result.tokens, true);
                    }
                    Timer_1.timer.stop();
                    return [2 /*return*/, token_list];
            }
        });
    });
}
exports.getTokens = getTokens;
function getTokenNameHash(first, orderBy, direction) {
    if (direction === void 0) { direction = QueryHelper_1.OrderDirection.desc; }
    return __awaiter(this, void 0, void 0, function () {
        var tokenHash, tokens, _i, tokens_1, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenHash = {};
                    return [4 /*yield*/, getTokens(first, orderBy, direction)];
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
}
exports.getTokenNameHash = getTokenNameHash;
//# sourceMappingURL=Tokens.js.map