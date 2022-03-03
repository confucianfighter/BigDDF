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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHelper = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var EthDater = require('ethereum-block-by-date');
var ethers = __importStar(require("ethers"));
var TimeUtils_1 = require("../../Utils/TimeUtils");
var QueryBuilder_1 = require("../QueryBuilder");
var QueryHelper_1 = require("../QueryHelper");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var Timer_1 = require("../../Utils/Timer");
var BlockHelper = /** @class */ (function () {
    function BlockHelper(provider_url) {
        if (provider_url === void 0) { provider_url = 'https://mainnet.infura.io/v3/c696501080344af183d1d2e0c5578ad7'; }
        this.lastBlock = null;
        this.currentBlock = null;
        this.minutes_between_blocks = undefined;
        this.provider_url = 'https://mainnet.infura.io/v3/c696501080344af183d1d2e0c5578ad7';
        if (BlockHelper.Singleton === null)
            BlockHelper.Singleton = this;
        BlockHelper.Singleton.provider_url = provider_url;
        return BlockHelper.Singleton;
    }
    /* Currently just returns just one block. Blocks are simply numbers,
     but this returns a block interface with a timestamp.
     */
    BlockHelper.prototype.getBlocks = function (first) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, dater, _a, t24, t48, tWeek, now, blocks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Timer_1.timer.start("getBlocks");
                        provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/c696501080344af183d1d2e0c5578ad7");
                        dater = new EthDater(provider);
                        _a = this.useDeltaTimestamps(), t24 = _a[0], t48 = _a[1], tWeek = _a[2];
                        now = new Date();
                        return [4 /*yield*/, this.queryBlocks(first)];
                    case 1:
                        blocks = _b.sent();
                        this.lastBlock = this.currentBlock;
                        this.currentBlock = blocks[0];
                        Timer_1.timer.stop();
                        return [2 /*return*/, blocks];
                }
            });
        });
    };
    /* Checks to see how long between block updates on the network. Stores last block with its timestamp */
    BlockHelper.prototype.computeUpdateTime = function () {
        var _a, _b;
        if (this.lastBlock !== null
            && this.currentBlock !== null
            && ((_a = this.lastBlock) === null || _a === void 0 ? void 0 : _a.number) !== ((_b = this.currentBlock) === null || _b === void 0 ? void 0 : _b.number)) {
            // it's unix epoch time * 1000
            var last_block_time = new Date(this.lastBlock.timestamp * 1000);
            // it's unix epoch time * 1000
            var current_block_time = new Date(this.currentBlock.timestamp * 1000);
            this.minutes_between_blocks =
                (0, TimeUtils_1.computeTimeElapsed)(last_block_time, current_block_time, TimeUtils_1.TimeUnits.seconds);
        }
        return this.minutes_between_blocks;
    };
    BlockHelper.prototype.queryBlocks = function (first) {
        return __awaiter(this, void 0, void 0, function () {
            var query_str, result, blocks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query_str = (0, QueryBuilder_1.getBlocksQuery)(first);
                        return [4 /*yield*/, new QueryHelper_1.QueryHelper().sendQuery(query_str, 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks')];
                    case 1:
                        result = _a.sent();
                        blocks = ['blocks'];
                        return [2 /*return*/, blocks];
                }
            });
        });
    };
    //Got this function from uniswap v3 info clone
    BlockHelper.prototype.useDeltaTimestamps = function () {
        var utcCurrentTime = (0, dayjs_1.default)();
        var t1 = utcCurrentTime.subtract(1, 'day').startOf('minute').toISOString();
        var t2 = utcCurrentTime.subtract(2, 'day').startOf('minute').toISOString();
        var tWeek = utcCurrentTime.subtract(1, 'week').startOf('minute').toISOString();
        return [t1, t2, tWeek];
    };
    BlockHelper.prototype.getReadableBlockTimestamp = function (block) {
        var timestamp = (0, moment_timezone_1.default)(new Date(block.timestamp * 1000));
        var out_str = timestamp.tz('America/New_York').format('MM/DD/YYYY hh:mm:ssa z');
        return out_str;
    };
    BlockHelper.Singleton = null;
    return BlockHelper;
}());
exports.BlockHelper = BlockHelper;
//# sourceMappingURL=BlockHelper.js.map