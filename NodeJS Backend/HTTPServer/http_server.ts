import {IncomingMessage} from "http";
import {sendSQLQuery} from "../Database/postgres";
import {QueryResult} from "pg";
const fromidable = require('formidable');

const http = require('http');
const url = require('url');

async function go():Promise<void> {
    const port = 3000;
    const server = http.createServer(async function (req: IncomingMessage, res: any) {
        //remove leading '/' from request:
        console.log(req.headers);
        //console.log(req.url);
        let path = (req.trailers);
        console.log(path);
        res.writeHead(200, {
            Connection: "keep-alive",
            "Cache-Control": "no-cache"
        });
        const url_str = req.url?.slice(1) ?? "";
        const query_str = decodeURI(url_str);//req.url?.slice(1).replace("/%20/"," ") ?? null;
        let result:QueryResult|null = null;
        if( query_str !== null && query_str !== "ws") {
            result = <QueryResult>(await sendSQLQuery(query_str));
        }
        let data = JSON.stringify(result)
        console.log(data);
        res.write(data);
        res.end();
    });

    server.listen(port, null, null, function (error: any) {
        if (error) {
            console.log("Something went wrong", error)
        } else {
            console.log("Server is listening on port " + port);
        }
    })
}
go();