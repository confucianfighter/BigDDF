"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_json_tree = void 0;
function print_json_tree(obj, filler, prefix, filler_multiplier) {
    if (prefix === void 0) { prefix = ''; }
    if (filler_multiplier === void 0) { filler_multiplier = 0; }
    for (var item in obj) {
        if (typeof obj[item] === "object") {
            print_json_tree(obj[item], filler, "".concat(prefix, "__").concat(item), filler_multiplier + 1);
        }
        else
            console.log("".concat(filler.repeat(filler_multiplier)).concat(prefix, "__").concat(item, ": ").concat(obj[item]));
    }
}
exports.print_json_tree = print_json_tree;
//# sourceMappingURL=print_json_tree.js.map