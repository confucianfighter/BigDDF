// had to downgrade to earlier version of fetch:
// npm i node-fetch@2.6.1
import fetch from 'node-fetch'

// Gets data on as many tokens from CoinGecko as specified:
export async function getAllTokenPrices(how_many:number):Promise<ICoinGeckoMarkets[]>
{
    //base url, going to add parameters in the loop:
    let url = `https://api.coingecko.com/api/v3/coins/markets?`
    // return list:
    let price_list:ICoinGeckoMarkets[] = [];
    // async functions returns promises, going to not 'await' and instead send out all queries at once and
    // collect the 'promises' in order to dramatically improve speed:
    let promises:Promise<any>[] = [];
    // Can only get 250 coins at a time:
    for(let i:number = 0; i < how_many/250; i++) {
        // params to add to end of url:
        let params: string[] =
            [
                `vs_currency=usd`,
                `order=market_cap_desc`,
                `per_page=250`,
                `page=${i}`,
                `sparkline=false`
            ]
        // https parameters are separated by the ampersand: '&'
        const joined_params = params.join('&');
        const url_params = url + joined_params;
        // gather the promises, do not 'await':
        try {
            promises.push(fetch(url_params));
        } catch { throw new Error( "Fetch request either timed out or network is down." )}
    }
    // finally, wait for all CoinGecko queries to come back:
    let results = await Promise.all(promises);
    // build one object list from the results:
    for(let result of results) {
        // result is 'any' type. 'object' type didn't seem to work:
        result = await result.json();
        // '...' is the spreader operator, drops the '[' and ']' off the list:
        price_list = [...price_list, ...result]
    }
    // drum roll...
    return price_list;
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
}
