import {sendSQLQuery} from "../../Database/postgres";
import {Timer} from "../../Utils/Timer";
import {CoinGecko, ICoinGeckoMarkets} from "./CoinGecko";
import {Logger} from "../../Utils/Logger/logger"
/* This is the main loop for collecting coin data history from coin gecko.
* It's meant to run in it's own instance of node, on it's own in store all
* info in coin_history table in the DDF postgres database as well as general
* info about each coin in the coin_gecko_coins table.*/
let coinGecko = new CoinGecko();
export async function go()
{
    let count = 0;
    while(true) {
        console.log("Update count: " + count++);
        let get_tokens_timer = new Timer(); get_tokens_timer.start();
        let first = 5000;
        // Send out http request for Coin gecko prices and assemble them into a list:
        let coins:ICoinGeckoMarkets[] = await coinGecko.getAllTokenPrices(first);
        // Check if all the coins we asked for are there:
        if(coins.length !== first) console.log( `
            Asked CoinGecko for ${first} coins but got back ${coins.length}.
        `); else (console.log(`Obtained all ${first} coins.`));
        // Build 5000 postgress insertion statements in a string:
        let price_insertion_str = await buildPriceInsertionQuery(coins);
        // Send the query:
        console.log("Sending postgres coin_history insertion query.");
        let result = await sendSQLQuery(price_insertion_str);
        //log("Added history to database.");
    }
}

interface coin_history{
    id:string;
    timestamp:Date;
    symbol:string;
    price:number;
}

async function buildPriceInsertionQuery(coins:ICoinGeckoMarkets[]):Promise<string>{
    console.log("Building postgres coin_history insertion query.");
    let query_str = ``;
    for(let coin of coins){
        let line_item = `
            insert into coin_history (symbol, timestamp, price, total_volume, market_cap)
            values(
                '${coin.symbol.replace(`'`,`''`)}', 
                '${coin.last_updated}', 
                 ${coin.current_price},
                 ${coin.total_volume},
                 ${coin.market_cap}
            ) 
            on conflict do nothing;
        `;
        query_str += line_item;
    }
    query_str += buildCoinGeckoCoinsInsertionString(coins);
    return query_str;
}
function buildCoinGeckoCoinsInsertionString(coins:ICoinGeckoMarkets[]):string
{
    let query_str = "";
    for(let coin of coins){
        let line_item = `
            insert into coin_gecko_coin_info (
                coin_id,
                symbol,                         
                name,                            
                image,
                last_updated,
                current_price,                   
                market_cap,                      
                market_cap_rank,                 
                fully_diluted_valuation,         
                total_volume,        
                high_24h,                        
                low_24h,                         
                price_change_24h,                
                price_change_percentage_24h,     
                market_cap_change_24h,           
                market_cap_change_percentage_24h,
                circulating_supply,              
                total_supply,                    
                max_supply,                      
                ath,                             
                ath_change_percentage,           
                ath_date,                        
                atl,                             
                atl_change_percentage,           
                atl_date
            )
            values(
                '${coin.id.replace(`'`,`''`)}',
                '${coin.symbol.replace(`'`,`''`)}',
                '${coin.name.replace(`'`,`''`)}',
                '${coin.image.replace(`'`,`''`)}',
                '${coin.last_updated}',
                ${coin.current_price},
                ${coin.market_cap},
                ${coin.market_cap_rank},
                ${coin.fully_diluted_valuation},
                ${coin.total_volume},
                ${coin.high_24h},
                ${coin.low_24h},
                ${coin.price_change_24h},
                ${coin.price_change_percentage_24h},
                ${coin.market_cap_change_24h},
                ${coin.market_cap_change_percentage_24h},
                ${coin.circulating_supply},
                ${coin.total_supply},
                ${coin.max_supply},
                ${coin.ath},
                ${coin.ath_change_percentage},
                '${coin.ath_date}',
                ${coin.atl},
                ${coin.atl_change_percentage},
                '${coin.atl_date}'
            ) 
            on conflict(coin_id)
            do update 
                SET coin_id = '${coin.id.replace(`'`,`''`)}',
                symbol = '${coin.symbol.replace(`'`,`''`)}',
                name = '${coin.name.replace(`'`,`''`)}',
                image = '${coin.image.replace(`'`,`''`)}',
                last_updated = '${coin.last_updated}',
                current_price = ${coin.current_price},
                market_cap = ${coin.market_cap},
                market_cap_rank = ${coin.market_cap_rank},
                fully_diluted_valuation = ${coin.fully_diluted_valuation},
                total_volume = ${coin.total_volume},
                high_24h = ${coin.high_24h},
                low_24h = ${coin.low_24h},
                price_change_24h = ${coin.price_change_24h},
                price_change_percentage_24h = ${coin.price_change_percentage_24h},
                market_cap_change_24h = ${coin.market_cap_change_24h},
                market_cap_change_percentage_24h = ${coin.market_cap_change_percentage_24h},
                circulating_supply = ${coin.circulating_supply},
                total_supply = ${coin.total_supply},
                max_supply = ${coin.max_supply},
                ath = ${coin.ath},
                ath_change_percentage = ${coin.ath_change_percentage},
                ath_date = '${coin.ath_date}',
                atl = ${coin.atl},
                atl_change_percentage = ${coin.atl_change_percentage},
                atl_date = '${coin.atl_date}';
            `
        query_str += line_item;
    }
    return query_str;
}
go()