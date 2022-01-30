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
exports.getPoolState = exports.getPoolImmutables = void 0;
var v3_sdk_1 = require("@uniswap/v3-sdk");
var ethers_1 = require("ethers");
var sdk_core_1 = require("@uniswap/sdk-core");
var IUniswapV3Pool_json_1 = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
var Quoter_json_1 = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");
var smart_order_router_1 = require("@uniswap/smart-order-router");
//import JSBI from "jsbi";
var provider = new ethers_1.ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/c696501080344af183d1d2e0c5578ad7");
var poolAddress = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
var quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
var quoterContract = new ethers_1.ethers.Contract(quoterAddress, Quoter_json_1.abi, provider);
var poolImmutablesAbi = [
    "function factory() external view returns (address)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function fee() external view returns (uint24)",
    "function tickSpacing() external view returns (int24)",
    "function maxLiquidityPerTick() external view returns (uint128)",
];
var poolContract = new ethers_1.ethers.Contract(poolAddress, IUniswapV3Pool_json_1.abi, provider);
function getPoolImmutables() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick, immutables;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        poolContract.factory(),
                        poolContract.token0(),
                        poolContract.token1(),
                        poolContract.fee(),
                        poolContract.tickSpacing(),
                        poolContract.maxLiquidityPerTick(),
                    ])];
                case 1:
                    _a = _b.sent(), factory = _a[0], token0 = _a[1], token1 = _a[2], fee = _a[3], tickSpacing = _a[4], maxLiquidityPerTick = _a[5];
                    immutables = {
                        factory: factory,
                        token0: token0,
                        token1: token1,
                        fee: fee,
                        tickSpacing: tickSpacing,
                        maxLiquidityPerTick: maxLiquidityPerTick,
                    };
                    return [2 /*return*/, immutables];
            }
        });
    });
}
exports.getPoolImmutables = getPoolImmutables;
//getPoolImmutables().then((result) => {
//    console.log(result);
//});
function getPoolState() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, liquidity, slot, PoolState;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        poolContract.liquidity(),
                        poolContract.slot0()
                    ])];
                case 1:
                    _a = _b.sent(), liquidity = _a[0], slot = _a[1];
                    PoolState = {
                        liquidity: liquidity,
                        sqrtPriceX96: slot[0],
                        tick: slot[1],
                        observationIndex: slot[2],
                        observationCardinality: slot[3],
                        observationCardinalityNext: slot[4],
                        feeProtocol: slot[5],
                        unlocked: slot[6],
                    };
                    return [2 /*return*/, PoolState];
            }
        });
    });
}
exports.getPoolState = getPoolState;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, immutables, state, TokenA, TokenB, USDC_WETH_POOL, amountIn, quotedAmountOut, swapRoute, uncheckedTradeExample, token0Price, token1Price, router, route;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        getPoolImmutables(),
                        getPoolState(),
                    ])];
                case 1:
                    _a = _b.sent(), immutables = _a[0], state = _a[1];
                    TokenA = new sdk_core_1.Token(3, immutables.token0, 6, "USDC", "USD Coin");
                    TokenB = new sdk_core_1.Token(3, immutables.token1, 18, "WETH", "Wrapped Ether");
                    USDC_WETH_POOL = new v3_sdk_1.Pool(TokenA, TokenB, immutables.fee, state.sqrtPriceX96.toString(), state.liquidity.toString(), state.tick);
                    amountIn = 1500;
                    return [4 /*yield*/, quoterContract.callStatic.quoteExactInputSingle(immutables.token0, immutables.token1, immutables.fee, amountIn.toString(), 0)];
                case 2:
                    quotedAmountOut = _b.sent();
                    swapRoute = new v3_sdk_1.Route([USDC_WETH_POOL], TokenA, TokenB);
                    return [4 /*yield*/, v3_sdk_1.Trade.createUncheckedTrade({
                            route: swapRoute,
                            inputAmount: sdk_core_1.CurrencyAmount.fromRawAmount(TokenA, amountIn.toString()),
                            outputAmount: sdk_core_1.CurrencyAmount.fromRawAmount(TokenB, quotedAmountOut.toString()),
                            tradeType: sdk_core_1.TradeType.EXACT_INPUT,
                        })];
                case 3:
                    uncheckedTradeExample = _b.sent();
                    console.log("The quoted amount out is", quotedAmountOut.toString());
                    console.log("The unchecked trade object is", uncheckedTradeExample);
                    token0Price = USDC_WETH_POOL.token0Price;
                    token1Price = USDC_WETH_POOL.token1Price;
                    console.log("USDC Price is ".concat(token0Price.toFixed(), "."));
                    console.log("WETH Price is ".concat(token1Price.toFixed()));
                    router = new smart_order_router_1.AlphaRouter({ chainId: 1, provider: provider });
                    return [4 /*yield*/, router.route(sdk_core_1.CurrencyAmount.fromRawAmount(TokenA, 1000), TokenB, sdk_core_1.TradeType.EXACT_INPUT, {
                            recipient: "0x7a1f3B8644C4bf855f0b727B3FC3907A8EcfC83A",
                            slippageTolerance: new sdk_core_1.Percent(5, 100),
                            deadline: 10
                        })];
                case 4:
                    route = _b.sent();
                    console.log(route);
                    return [2 /*return*/];
            }
        });
    });
}
function fetchSpotPrice() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
main();
//# sourceMappingURL=ethers-example.js.map