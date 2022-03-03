//make a string hash
import * as _ from 'lodash'
import axios from 'axios'

let tokenHash:any = {}
tokenHash.eth = '12345';
console.log(tokenHash['eth']);
tokenHash['DAI'] = '4566DAI'
console.log(tokenHash['DAI']);

// make a keyed hash of a certain type:
type OnlyBoolsAndStrings = {
    [key: string]: boolean | string;
};
interface Token {
    id: string,
    symbol: string,
}
interface Pool {
    id: string;
    token0:Token;
}



type PoolsHash = {
    [key: string]: Pool
}

let pools_hash:PoolsHash = {
    pool1:
        {
            id: 'c',
            token0: {
                id: 'c',
                symbol: 'DAI'
            }
        },
    pool3:
        {
            id: 'c',
            token0: {
                id: 'a',
                symbol: 'ABC'
            }
        },
    pool2:
        {
            id: 'a',
            token0: {
                id: 'a',
                symbol: 'WETH'
            }
        },
    pool0:
        {
            id: 'a',
            token0: {
                id: 'a',
                symbol: 'BCD'
            }
        }
};

// To convert a hash to a keyed list:
let pool_list_from_hash = <Pool[]>_.values(pools_hash);
pool_list_from_hash = _.orderBy(pool_list_from_hash,['token0.id', 'token0.symbol'],'asc');


/* Note: identical keys are simply replaced. it keeps the last item that matches that key.
Therefore, you can filter duplicates and select the duplicate at the top of some sort criteria.
But first you must sort in reverse.
Then after it gives you the list from the hash, sort it back the other way.
 */
// So if you want to select alphabetical from duplicates sort so that 'a' would be at the bottom:
pool_list_from_hash = _.orderBy(pool_list_from_hash,['token0.id', 'token0.symbol'],'desc');
console.log(pool_list_from_hash);
// then create the keyed dictionary which will select the last item among duplicates, which is 'a'
let listToHashPools = _.keyBy(pool_list_from_hash, 'token0.id');
console.log(listToHashPools);


interface Answer {
    name: 'string'
}
let str = `ddf's`
console.log(str.replace(`'`,`''`))






//pool_list_from_hash = _.orderBy(poolsHash,['token0.id', 'token0.symbol'],'asc');




