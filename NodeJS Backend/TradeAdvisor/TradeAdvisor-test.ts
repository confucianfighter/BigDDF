import {CoinGecko, ICoinGeckoMarkets, removeDuplicates} from "../PriceData/CoinGecko/CoinGecko";
import {ADMIN_LIST, sendEmail, Users} from "../Utils/MessageUtils/emailer";
import {getTokenNameHash} from "../Exchanges/UniswapV3/Tokens/Tokens";
import {timer} from "../Utils/Timer";
import moment from "moment-timezone";
import {computeTimeElapsed, TimeUnits} from "../Utils/TimeUtils";

export async function test()
{
    let coinGecko = new CoinGecko();
    let data:ICoinGeckoMarkets[] = await coinGecko.getAllTokenPrices(5000);
    data = removeDuplicates(data);
    let x = 2;
    let y = 3;
    let z = x+y;
    let w = z + y;

    console.log(w);
    sendEmail(["ddfalerts@gmail.com"], await printItems(data));
}

export async function printItems(items: ICoinGeckoMarkets[]): Promise<string>
{
    let tokenHash = await getTokenNameHash(5000,'volumeUSD');
    timer.start();
    let result = "";
    const header_str =
        `<h1>Hot Coins:</h1>
    `;
    result = result + header_str;
    items.forEach((token, i)=> {
        if( token.price_change_percentage_24h > 50
            && tokenHash[token.symbol.toUpperCase()]) {
            let fString = `  
                    <h2>${ token.symbol.toUpperCase() }</h2>
                    <img src = "${ token.image }" alt="" width = "50px">
                    <p>name: <em>${ token.name}</em></p>               
                    <p>price: <em>$${token.current_price}</em></p>
                    <p>last updated: <em>${moment(token.last_updated).tz('America/New_York').format('MM/DD/YYYY hh:mma z')}</em></p>
                    <p>time since last update: <em> ${computeTimeElapsed(new Date(token.last_updated),
                new Date(),
                TimeUnits.minutes)?.toPrecision(2)} minutes.</em></p>
                    <p>24 hour percent increase: <em> ${token.price_change_percentage_24h}%</em></p>
                    <p><a href="https://info.uniswap.org/#/tokens/${tokenHash[token.symbol.toUpperCase()].id}">Uniswap V3 Info</a></p>
                `
            result = result + fString;
        }
    });
    timer.stop("Make print out", TimeUnits.seconds);
    return result;
}

test();