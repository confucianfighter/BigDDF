import {CLIENT, POOL, initializeDDFDatabase} from "../Database/postgres";
import {PoolClient} from 'pg';
let updates = 0;
async function go() {
    initializeDDFDatabase();
    let client = <PoolClient>(await POOL?.connect());
    if (client !== null) {
        client.on('notification', (msg: any) => {
            console.log("Update: " + updates++);
            if (msg.name === 'notification' && msg.channel === 'price_update') {
                let pl = JSON.parse(msg.payload);
                console.log("*========*");
                Object.keys(pl).forEach(function (key) {
                    console.log(key, pl[key]);
                });
                console.log("-========-");
            }
        });
        let subscribe_result = await client?.query("LISTEN new_price;");
        console.log(subscribe_result);
    }
    else {
        throw new Error(`Client is null! Client would have been retrieved from pool.connect(), here
                        is a printout of the pool: ` + POOL);
    }
}
go();