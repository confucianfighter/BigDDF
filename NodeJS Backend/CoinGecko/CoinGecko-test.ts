import {getAllTokenPrices, ICoinGeckoMarkets, removeDuplicates} from './CoinGecko'
import moment from "moment-timezone";
import {computeTimeElapsed, TimeUnits} from "../Utils/TimeUtils";
import {sendEmail, Users} from "../MessageUtils/emailer";
import {queryHelper, QueryHelper} from "../GraphQL/QueryHelper";
import * as Timer from "../Utils/Timer";
import {timer} from "../Utils/Timer";
import {getTokenNameHash,getTokens,TokenHash} from "../Exchanges/UniswapV3/Tokens/Tokens";



export async function test()
{
    let data:ICoinGeckoMarkets[] = await getAllTokenPrices(5000);
    data = removeDuplicates(data);
    sendEmail(Users.daylan, await printItems(data));
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