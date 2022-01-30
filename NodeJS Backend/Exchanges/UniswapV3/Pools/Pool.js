"use strict";
// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = void 0;
var Pool = /** @class */ (function () {
    function Pool(data) {
        this.id = data.id; // ID!
        this.createdAtTimestamp = data.createdAtTimestamp; // BigInt!
        this.createdAtBlockNumber = data.createdAtBlockNumber; // BigInt!
        this.token0 = data.token0; // IToken!
        this.token1 = data.token1; // IToken!
        this.feeTier = data.feeTier; // BigInt!
        this.liquidity = data.liquidity; // BigInt!
        this.sqrtPrice = data.sqrtPrice; // BigInt!
        this.feeGrowthGlobal0X128 = data.feeGrowthGlobal0X128; // BigInt!
        this.feeGrowthGlobal1X128 = data.feeGrowthGlobal1X128; // BigInt!
        this.token0Price = data.token0Price; // BigDecimal!
        this.token1Price = data.token1Price; // BigDecimal!
        this.tick = data.tick; // BigInt
        this.observationIndex = data.observationIndex; // BigInt!
        this.volumeToken0 = data.volumeToken0; // BigDecimal!
        this.volumeToken1 = data.volumeToken1; // BigDecimal!
        this.volumeUSD = data.volumeUSD; // BigDecimal!
        this.untrackedVolumeUSD = data.untrackedVolumeUSD; // BigDecimal!
        this.feesUSD = data.feesUSD; // BigDecimal!
        this.txCount = data.txCount; // BigInt!
        this.collectedFeesToken0 = data.collectedFeesToken0; // BigDecimal!
        this.collectedFeesToken1 = data.collectedFeesToken1; // BigDecimal!
        this.collectedFeesUSD = data.collectedFeesUSD; // BigDecimal!
        this.totalValueLockedToken0 = data.totalValueLockedToken0; // BigDecimal!
        this.totalValueLockedToken1 = data.totalValueLockedToken1; // BigDecimal!
        this.totalValueLockedETH = data.totalValueLockedETH; // BigDecimal!
        this.totalValueLockedUSD = data.totalValueLockedUSD; // BigDecimal!
    }
    Pool.getETHPriceUSD = function (pool) {
        var _a, _b;
        if (((_a = pool.token0) === null || _a === void 0 ? void 0 : _a.symbol) === "WETH") {
            return parseFloat(pool.token1Price);
        }
        else if (((_b = pool.token1) === null || _b === void 0 ? void 0 : _b.symbol) === "WETH") {
            return parseFloat(pool.token0Price);
        }
        else
            throw new Error("Pool does not have a token called WETH! WTFO!");
    };
    Pool.prototype.print = function () {
        var _a, _b;
        var out_str = "\n        Pool ".concat((_a = this.token0) === null || _a === void 0 ? void 0 : _a.symbol, "-").concat((_b = this.token1) === null || _b === void 0 ? void 0 : _b.symbol, "\n            id: ").concat(this.id, "\n        ");
        return out_str;
    };
    return Pool;
}());
exports.Pool = Pool;
//# sourceMappingURL=Pool.js.map