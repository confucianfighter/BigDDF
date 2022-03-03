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
Object.defineProperty(exports, "__esModule", { value: true });
//make a string hash
var _ = __importStar(require("lodash"));
var tokenHash = {};
tokenHash.eth = '12345';
console.log(tokenHash['eth']);
tokenHash['DAI'] = '4566DAI';
console.log(tokenHash['DAI']);
var pools_hash = {
    pool1: {
        id: 'c',
        token0: {
            id: 'c',
            symbol: 'DAI'
        }
    },
    pool3: {
        id: 'c',
        token0: {
            id: 'a',
            symbol: 'ABC'
        }
    },
    pool2: {
        id: 'a',
        token0: {
            id: 'a',
            symbol: 'WETH'
        }
    },
    pool0: {
        id: 'a',
        token0: {
            id: 'a',
            symbol: 'BCD'
        }
    }
};
// To convert a hash to a keyed list:
var pool_list_from_hash = _.values(pools_hash);
pool_list_from_hash = _.orderBy(pool_list_from_hash, ['token0.id', 'token0.symbol'], 'asc');
/* Note: identical keys are simply replaced. it keeps the last item that matches that key.
Therefore, you can filter duplicates and select the duplicate at the top of some sort criteria.
But first you must sort in reverse.
Then after it gives you the list from the hash, sort it back the other way.
 */
// So if you want to select alphabetical from duplicates sort so that 'a' would be at the bottom:
pool_list_from_hash = _.orderBy(pool_list_from_hash, ['token0.id', 'token0.symbol'], 'desc');
console.log(pool_list_from_hash);
// then create the keyed dictionary which will select the last item among duplicates, which is 'a'
var listToHashPools = _.keyBy(pool_list_from_hash, 'token0.id');
console.log(listToHashPools);
var str = "ddf's";
console.log(str.replace("'", "''"));
//pool_list_from_hash = _.orderBy(poolsHash,['token0.id', 'token0.symbol'],'asc');
//# sourceMappingURL=sandbox.js.map