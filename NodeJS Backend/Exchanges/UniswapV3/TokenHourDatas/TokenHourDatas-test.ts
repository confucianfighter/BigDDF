import {OrderDirection, QueryHelper} from "../../../GraphQL/QueryHelper";
import {TokenHourData} from "./TokenHourData";
import {getTokenHourData} from "./TokenHourDatas";

async function testGetTokenHourDatas(how_many_print:number,symbol_to_search:string = ""):Promise<string>
{
    const qh = new QueryHelper();
    const tokenHourDatas: TokenHourData[] =
        await getTokenHourData(how_many_print, 'volumeUSD', OrderDirection.desc);
    // prepare some selections for pretty printing:
    let list_print_str: String = ``;
    if(symbol_to_search != "")
    {
        let found_item:boolean = false;
        for(let hour_datas of tokenHourDatas)
        {
            if(hour_datas.token?.symbol === symbol_to_search)
            {
                found_item = true;
                list_print_str +=
                    `Found it!
                       Token: ${hour_datas.token?.symbol}
                            id: ${hour_datas.token?.id }
                            priceUSD: ${hour_datas.priceUSD}
                            volumeUSD: ${hour_datas.volumeUSD}
                            number of pools: ${hour_datas.token?.poolCount }
                     `
            }
        }
        if(!found_item) {
            list_print_str += `Could not find token with symbol: ${symbol_to_search}`
        }
    }
    else {
        for (let i: number = 0; i < how_many_print; i++) {
            list_print_str +=
                `Token: ${tokenHourDatas[i].token?.symbol}
            id: ${tokenHourDatas[i].token?.id}
            priceUSD: ${tokenHourDatas[i].priceUSD}
            volumeUSD: ${tokenHourDatas[i].volumeUSD}
            number of pools: ${tokenHourDatas[i].token?.poolCount}
         `
        }
    }
    const message:string =
        ` tokenHourDatas:
    `+ `total items: ${tokenHourDatas.length}
    `+ `${list_print_str.toString()} 
    `;
    console.log(message);
    return message;
}
