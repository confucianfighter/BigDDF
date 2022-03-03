"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emailer_1 = require("./emailer");
var message = "<h1>Check check check check</h1>\n<p>pshhhhhhhhhhhhhzzzzzzzt</p>\n<img src=\"https://assets.coingecko.com/coins/images/11860/large/photo_2021-06-24_00-48-28.jpg?1625495610\" alt=\"\" width=\"50px\">\n<a href=\"https://info.uniswap.org/#/tokens/0xfb130d93e49dca13264344966a611dc79a456bc5\">Price Data on Random Coin</a>";
(0, emailer_1.sendEmail)([emailer_1.USER_HASH.daylan], message);
//# sourceMappingURL=emailer-test.js.map