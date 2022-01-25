import { getAllTokenPrices, ICoinGeckoMarkets } from './CoinGecko'
import moment from "moment-timezone";
import { computeTimeElapsed, TimeUnits } from "../../Utils/TimeUtils";

export async function test()
{
    let data:ICoinGeckoMarkets[] = await getAllTokenPrices(5000);
    console.log(printItems(data));
}

export function printItems(items: ICoinGeckoMarkets[]): string
{
    let result: string = "";
    const header_str:string =
        `CoinGecko Price Query:
        number of items returned: ${ items.length }
    `;
    result.concat(header_str);
    items.forEach((token, i)=> {
            if( token.price_change_percentage_24h > 50) {
                let fString = `
                Item number: ${i}
                    symbol: ${ token.symbol } ...warning, some tokens may have the same symbol as eachother.
                    image: ${ token.image }
                    id: ${ token.id }
                    name: ${ token.name }
                    price: ${token.current_price}
                    updated: ${moment(token.last_updated).tz('America/New_York').format('MM/DD/YYYY hh:mma z')}
                    time since last update: ${computeTimeElapsed(new Date(token.last_updated),
                        new Date(),
                        TimeUnits.minutes)?.toPrecision(2)} minutes.
                    percent increase: ${token.price_change_percentage_24h}
                `
                result = result + fString;
            }
    });
    return result;
}

test();