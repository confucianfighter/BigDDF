"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Database = void 0;
var QueryHelper_1 = require("../GraphQL/QueryHelper");
var fs_1 = require("fs");
var path = __importStar(require("path"));
var Database = /** @class */ (function () {
    function Database() {
        this.CurrentPrices = null;
        this.MarkedPrices = [];
        this.q = new QueryHelper_1.QueryHelper();
        if (Database.Singleton === null) {
            Database.Singleton = this;
        }
        return Database.Singleton;
    }
    Database.prototype.updateCurrentPrices = function (first, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.makePriceList(first, orderBy)];
                    case 1:
                        _a.CurrentPrices = _b.sent();
                        return [2 /*return*/, this.CurrentPrices];
                }
            });
        });
    };
    Database.prototype.markAllPrices = function (first, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.makePriceList(first, orderBy)];
                    case 1:
                        _a.MarkedPrices = _b.sent();
                        return [2 /*return*/, this.MarkedPrices];
                }
            });
        });
    };
    Database.prototype.makePriceList = function (first, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var q_result, prices, _i, q_result_1, pool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.q.getPools(first, orderBy, QueryHelper_1.OrderDirection.desc)];
                    case 1:
                        q_result = _a.sent();
                        prices = [];
                        for (_i = 0, q_result_1 = q_result; _i < q_result_1.length; _i++) {
                            pool = q_result_1[_i];
                            prices = __spreadArray(__spreadArray([], prices, true), [__assign(__assign({}, pool), { timestamp: new Date() })], false);
                        }
                        return [2 /*return*/, prices];
                }
            });
        });
    };
    Database.prototype.storeMarkedPrices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, fs_1.writeFileSync)(path.resolve("./", 'MarkedPrices.json'), JSON.stringify(this.MarkedPrices));
                return [2 /*return*/];
            });
        });
    };
    Database.prototype.loadMarkedPrices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loaded_string, data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        loaded_string = null;
                        data = (0, fs_1.readFileSync)('/Users/daylannance/Documents/uniswap-getting-started/Database/MarkedPrices.json', 'utf8');
                        _a = this;
                        _b = Object;
                        return [4 /*yield*/, JSON.parse(data)];
                    case 1:
                        _a.MarkedPrices = _b.apply(void 0, [_c.sent()]);
                        // @ts-ignore
                        return [2 /*return*/, this.MarkedPrices];
                }
            });
        });
    };
    Database.Singleton = null;
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=database.js.map