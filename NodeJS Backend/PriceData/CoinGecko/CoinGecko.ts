// had to downgrade to earlier version of fetch:
// f*** node-fetch. Axios actually works!
import axios, {AxiosResponse} from 'axios';
import {computeTimeElapsed, TimeUnits} from "../../Utils/TimeUtils";
import {Timer, timer} from "../../Utils/Timer";
import {delay} from "../../Utils/delay";
import { Base } from '../../Utils/Base';
import { basename } from 'path';

// Gets data on as many tokens from CoinGecko as specified:
export class CoinGecko extends Base{
    success_count:number
    constructor(){
        super("./Logs/CoinGecko.log",100);
        this.success_count = 0;
    }
    async getAllTokenPrices(how_many:number):Promise<ICoinGeckoMarkets[]>
    {
        let error_count = 0; 
        let price_list: ICoinGeckoMarkets[] = [];
        let url = `https://api.coingecko.com/api/v3/coins/markets?`
        // Can only get 250 coins at a time:
        for (let i: number = 0; i < how_many / 250; i++) {
            // params to add to end of url:
            let per_page = how_many < 250? how_many:250;
            let params: string[] =
            [
                `vs_currency=usd`,
                `order=market_cap_desc`,
                `per_page=${per_page}`,
                `page=${i}`,
                `sparkline=false`
            ];
            // https parameters are separated by the ampersand: '&'
            const joined_params = params.join('&');
            const url_params = url + joined_params;
            // gather the promises, do not 'await':
            this.logger.log(`Getting next 250 coins on page ${i} of ${how_many/250}.`)
            let result:ICoinGeckoMarkets[] = [];
            let axios_result = <AxiosResponse>{};
            let retry = true;
            while(retry) {
                let delay_millis = 60000/50;
                await delay(delay_millis);
                try {
                    axios_result = await axios.get(url_params);
                } catch (err: any) {
                    retry = true;
                    error_count++;
                    this.log(`Fetch request either timed out or network is down. Error name was ${err.name}`)
                    this.log("Error count: " + error_count);
                }
                this.log("Error count: " + error_count);
                retry  = false;
            }
            result = <ICoinGeckoMarkets[]>axios_result.data;
            if(result !== null && result !== undefined) {
                price_list = [...price_list, ...result]
                this.success_count++;
            }
            else { retry = true;}
        }
        //drum roll...
        this.log("success count: " + this.success_count)
        this.log("error count: " + error_count)
        return price_list;
    }
}

export interface ICoinGeckoMarkets {
    id:                               string;
    symbol:                           string;
    name:                             string;
    image:                            string;
    current_price:                    number;
    market_cap:                       number;
    market_cap_rank:                  null;
    fully_diluted_valuation:          null;
    total_volume:                     number;
    high_24h:                         number;
    low_24h:                          number;
    price_change_24h:                 number;
    price_change_percentage_24h:      number;
    market_cap_change_24h:            number;
    market_cap_change_percentage_24h: number;
    circulating_supply:               number;
    total_supply:                     number;
    max_supply:                       null;
    ath:                              number;
    ath_change_percentage:            number;
    ath_date:                         Date;
    atl:                              number;
    atl_change_percentage:            number;
    atl_date:                         Date;
    roi:                              null;
    last_updated:                     Date;
    PRICE_PERCENT_DIFFERENCE_AMONG_DUPLICATES: number;
}

export function sortByID(a:ICoinGeckoMarkets, b:ICoinGeckoMarkets): number {
    // In Coin Gecko, they are giving names as the id. Maybe it is more unique than the actual 'name' property?
    if(a.id > b.id) return 1;
    else if(a.id < b.id) return -1;
    else return 0;
}

// There some 500 out of 5000 coins listed with duplicates. So far there hasn't been even a 1% difference
// in any of the prices they are giving, which is all we care about.
export function checkForDuplicatesAndPriceVariation(
list:ICoinGeckoMarkets[],
throw_error_if_price_varies: boolean = false)
: [thereWereDuplicates:boolean, thePricesVaried:boolean]
{
    let thereWereDuplicates = false;
    let thePricesVaried = false;
    let list_copy = [...list];
    list_copy = list_copy.sort(sortByID);
    let passed:boolean = true;
    // Each duplicate message is added to this string as a list item:
    let error_str:string = "";
    // included in the message:
    let error_count:number = 0;
    //length must be at least two because we are popping then comparing:
    while(list_copy.length > 1) {
        // pop last item off the list:
        let a:ICoinGeckoMarkets = <ICoinGeckoMarkets>list_copy.pop();
        // peek at the next item:
        let b:ICoinGeckoMarkets = <ICoinGeckoMarkets>list_copy[list_copy.length - 1];
        let price_percent_difference = 0;
        // compare id and % price difference
        if( a.id === b.id){
            thereWereDuplicates = true;
            price_percent_difference= (Math.abs(a.current_price - b.current_price) / a.current_price) * 100;
            if(price_percent_difference > 1) {
                error_count += 1;
                thePricesVaried = true;
                error_str = error_str + `
                    Coin with id ${a.id} has a duplicate with mismatched prices.
                    Price of first one is: ${a.current_price}
                    Price of second one is: ${b.current_price}
                    Price percent difference is: %${price_percent_difference}
                    Last coin A update: ${a.last_updated}
                    Last coin B update: ${b.last_updated}
                `;
            }
        }
        a.PRICE_PERCENT_DIFFERENCE_AMONG_DUPLICATES = price_percent_difference;
        b.PRICE_PERCENT_DIFFERENCE_AMONG_DUPLICATES = price_percent_difference;
    }
    if(thePricesVaried && throw_error_if_price_varies) {
        error_str = `There were ${error_count} coins with duplicate symbols and the prices varied!.
            `  + error_str;
        throw new Error(error_str);
    }
    // if we made it here, everything passed:
    else console.log("No duplicates found.");
    return [thereWereDuplicates,thereWereDuplicates];
}

export function sortCoinGeckoBySymbol(a:ICoinGeckoMarkets, b:ICoinGeckoMarkets) :number{
    if (a.symbol > b.symbol) return 1;
    else if (a.symbol < b.symbol) return -1;
    else return 0;
}

export function removeDuplicates(coins:ICoinGeckoMarkets[]):ICoinGeckoMarkets[]{
    let coins_copy:ICoinGeckoMarkets[] = [...coins.sort(sortByID)];
    let return_coins:ICoinGeckoMarkets[] = [];
    checkForDuplicatesAndPriceVariation(coins);
    // needs to be at least two coins so we can compare:
    while(coins_copy.length > 1)
    {
        let a = <ICoinGeckoMarkets>coins_copy.shift();
        while (true) {
            if(a.symbol === coins_copy[0].symbol)
            {
                let b = <ICoinGeckoMarkets>coins_copy.shift();
                let time_a = a.last_updated;
                let time_b = b.last_updated;
                let time_difference = computeTimeElapsed(time_a,time_b,TimeUnits.millis);
                if(time_difference > 0) {
                    a = b;
                    continue;

                }
            }
            else break;
        }
        return_coins.push(a);
        let b:ICoinGeckoMarkets = coins[0];
        if(a.symbol === b.symbol) coins_copy.shift();
    }
    let [thereWereDuplicates, thePricesVaried] = checkForDuplicatesAndPriceVariation(return_coins);
    if(thereWereDuplicates) throw new Error("My God man! Remove Coin Gecko duplicate logic is not working!");
    else console.log("CoinGecko duplicates removed successfully.");
    return return_coins;
}