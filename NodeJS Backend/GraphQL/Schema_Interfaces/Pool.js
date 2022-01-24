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
    function Pool() {
    }
    //poolHourData?: //  [PoolHourData!]!
    //poolDayData?: //  [PoolDayData!]!
    //mints?: //  [Mint!]!
    //burns?: //  [Burn!]!
    //swaps?: //  [Swap!]!
    //collects?: //  [Collect!]!
    //ticks?: //  [Tick!]!
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
    ;
    return Pool;
}());
exports.Pool = Pool;
//# sourceMappingURL=Pool.js.map