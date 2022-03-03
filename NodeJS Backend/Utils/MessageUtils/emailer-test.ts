import {ADMIN_LIST, sendEmail, USER_HASH, Users} from "./emailer";

let message = `<h1>Check check check check</h1>
<p>pshhhhhhhhhhhhhzzzzzzzt</p>
<img src="https://assets.coingecko.com/coins/images/11860/large/photo_2021-06-24_00-48-28.jpg?1625495610" alt="" width="50px">
<a href="https://info.uniswap.org/#/tokens/0xfb130d93e49dca13264344966a611dc79a456bc5">Price Data on Random Coin</a>`

sendEmail([USER_HASH.daylan], message);