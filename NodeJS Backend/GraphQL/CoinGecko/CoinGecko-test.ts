import * as cg from'./CoinGecko'
export async function test()
{
    let data:object[] = await cg.getAllTokenPrices(5000);
    const out_str:string =
    `CoinGecko Price Query:
        number of items returned: ${data.length}
    `;
    console.log(out_str);
    let token:object; let i:number
    data.forEach((token, i)=> {
        console.log(
            `Item number: ${i}
                ${JSON.stringify(token)}
            `
        )
    });
}

test();