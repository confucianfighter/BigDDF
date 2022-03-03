import {sendSQLQuery} from "./postgres";
import {Query, QueryResult} from "pg";

async function test()
{
    let query_str =
    `
    INSERT INTO test (timestamp, test_name ) values(now(),'test ignition');
    `
    let result = <QueryResult>(await sendSQLQuery(query_str));
    console.log(result);
}

test();