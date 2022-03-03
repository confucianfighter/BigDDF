import * as CoinGecko from './PriceData/CoinGecko/CoinGecko-test'
import * as Pools from './Exchanges/UniswapV3/Pools/Pools-test'
import * as Tokens from './Exchanges/UniswapV3/Tokens/Tokens-test'

async function test(){
    await CoinGecko.test();
    await Pools.test();
    await Tokens.test();
}

test();
