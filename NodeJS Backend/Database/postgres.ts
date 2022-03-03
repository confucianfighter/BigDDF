import {Pool, Client, QueryResult} from 'pg';
// pools will use environment variables
// for connection information
export let POOL:Pool | null = null;
export let CLIENT:Client | null = null;
export type VIA = "CLIENT" | "POOL";
export async function initializeDDFDatabase()
{
    if(POOL === null) {
        POOL = new Pool({
            user: 'daylannance',
            host: 'localhost',
            database: 'ddf',
            password: '',
            port: 5432, /*default port, it always seems to run on this.*/
        });
        let query_str = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        let create_extension_result = await sendSQLQuery(query_str);
        await POOL?.connect();
    }
}
export async function sendSQLQuery(query_str:string, via:VIA = 'POOL'):Promise<QueryResult | undefined>{
    initializeDDFDatabase();
    let res:QueryResult | undefined = undefined;
    try {
        res = await POOL?.query(query_str);
    } catch(e) { console.log(e); await POOL?.end(); throw new Error("Client query failed")}
    return res;
}

export async function connectViaClient():Promise<Client> {
    CLIENT = new Client()
    try {
        await CLIENT.connect()
        const res = await CLIENT.query('SELECT NOW()')
    } catch(e) { console.error(e); CLIENT.end(); }
    return CLIENT;
}