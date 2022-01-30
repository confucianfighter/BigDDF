import dayjs from "dayjs";
const EthDater = require('ethereum-block-by-date');
//import * as EthDater from "ethereum-block-by-date"
import * as ethers from 'ethers'
import { computeTimeElapsed, TimeUnits} from "../../Utils/TimeUtils";
import {getBlocksQuery} from "../QueryBuilder";
import {QueryHelper} from "../QueryHelper";
import {Block} from './Block'
import moment from "moment-timezone";
import {timer} from "../../Utils/Timer";

export class BlockHelper {
    public static Singleton: BlockHelper | null = null;
    public lastBlock:Block | null = null;
    public currentBlock:Block | null = null;
    public minutes_between_blocks:number | undefined = undefined;
    private provider_url: string = 'https://mainnet.infura.io/v3/c696501080344af183d1d2e0c5578ad7';
    constructor(provider_url = 'https://mainnet.infura.io/v3/c696501080344af183d1d2e0c5578ad7')
    {
        if(BlockHelper.Singleton === null) BlockHelper.Singleton = this;
        BlockHelper.Singleton.provider_url = provider_url;
        return BlockHelper.Singleton;
    }
    /* Currently just returns just one block. Blocks are simply numbers,
     but this returns a block interface with a timestamp.
     */
    public async getBlocks(first:number): Promise<Block[]> {
        timer.start("getBlocks");
        const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/c696501080344af183d1d2e0c5578ad7");
        //const provider = new ethers.providers.CloudflareProvider();
        const dater = new EthDater( provider );
        let [t24, t48, tWeek] = this.useDeltaTimestamps();
        let now: Date = new Date();
        // valid date format: '2016-07-20T13:20:40Z'
        // Date, required. Any valid moment.js value: string, milliseconds, Date() object, moment() object.// Block after, optional. Search for the nearest block before or after the given date. By default true.
        //let t24_block = await dater.getDate( now, true );
        let blocks = await this.queryBlocks(first);
        this.lastBlock = this.currentBlock;
        this.currentBlock = blocks[0];
        timer.stop();
        return blocks;
    }

    /* Checks to see how long between block updates on the network. Stores last block with its timestamp */
    private computeUpdateTime():number | undefined {
        if(this.lastBlock !== null
            && this.currentBlock !== null
            && this.lastBlock?.number !== this.currentBlock?.number) {
            // it's unix epoch time * 1000
            // @ts-ignore
            let last_block_time = new Date(this.lastBlock.timestamp * 1000);
            // it's unix epoch time * 1000
            // @ts-ignore
            let current_block_time = new Date(this.currentBlock.timestamp * 1000);
            this.minutes_between_blocks =
                computeTimeElapsed(last_block_time, current_block_time, TimeUnits.seconds);
        }
        return this.minutes_between_blocks;
    }

    private async queryBlocks(first:number):Promise<Block[]>
    {
        let query_str = getBlocksQuery(first);
        let result = await new QueryHelper().sendQuery<Block[]>(query_str,'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks');
        let blocks = <Block[]>['blocks'];
        return blocks;
    }

    //Got this function from uniswap v3 info clone
    public useDeltaTimestamps(): [string, string, string] {
        const utcCurrentTime = dayjs()
        const t1 = utcCurrentTime.subtract(1, 'day').startOf('minute').toISOString();
        const t2 = utcCurrentTime.subtract(2, 'day').startOf('minute').toISOString();
        const tWeek = utcCurrentTime.subtract(1, 'week').startOf('minute').toISOString();
        return [t1, t2, tWeek]
    }

    public getReadableBlockTimestamp(block:Block | undefined):string
    {
        // @ts-ignore
        let timestamp = moment(new Date(block.timestamp * 1000));
        let out_str = timestamp.tz('America/New_York').format('MM/DD/YYYY hh:mm:ssa z');
        return out_str;
    }
}
