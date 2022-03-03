"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBlock = void 0;
var BlockHelper_1 = require("./BlockHelper");
function printBlock(block) {
    var out_str = "\n            Block number: ".concat(block.number, "\n            Timestamp: ").concat(new BlockHelper_1.BlockHelper().getReadableBlockTimestamp(block), "\n            ");
    return out_str;
}
exports.printBlock = printBlock;
//# sourceMappingURL=Block.js.map