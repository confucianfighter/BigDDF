import {BlockHelper} from './BlockHelper'
import {Block, printBlock} from './Schema_Interfaces/Block'

export async function test() {
    let blocks:Block[] = await (new BlockHelper().getBlocks(10));
    console.log(blocks);

    for(let block of blocks) {
        console.log(printBlock(block));
    }
}

test();