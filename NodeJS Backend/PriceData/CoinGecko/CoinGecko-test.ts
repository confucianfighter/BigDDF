import {CoinGecko, ICoinGeckoMarkets, removeDuplicates} from './CoinGecko'
import moment from "moment-timezone";
import {computeTimeElapsed, TimeUnits} from "../../Utils/TimeUtils";
import {sendEmail, Users} from "../../Utils/MessageUtils/emailer";
import {queryHelper, QueryHelper} from "../../GraphQL/QueryHelper";
import {Timer} from "../../Utils/Timer";

export async function test()
{
    let coinGecko = new CoinGecko()
    console.log(`Starting CoinGecko.ts test:`)
    let get_tokens_timer = new Timer(); get_tokens_timer.start();
    let first = 5000;
    let coins:ICoinGeckoMarkets[] = await coinGecko.getAllTokenPrices(first);
    if(coins.length !== 5000) throw new Error( `
        Asked CoinGecko for ${first} coins but got back ${coins.length}.
    `);
    else console.log(
        `   Asked CoinGecko for ${first} coins and got back ${first}. Looks good.`);
    get_tokens_timer.stop(`CoinGeck.getAllTokenPrices(${first})`);
    console.log(`   ...finished CoinGecko.ts test.`)
}

function lookForNonNumbersInPrices(coins:ICoinGeckoMarkets[])
{
    for(let coin of coins) {
        if(isNaN(coin.current_price) && coin.current_price > 0) {
            throw new Error( `CoinGecko.getAllTokenPrices returned a price that's not a number.`);
        }
        else(console.log(`All prices CoinGecko.getAllTokenPrices check out as real numbers greater than zero.`))
    }
}


