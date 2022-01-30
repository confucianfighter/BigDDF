import {getAllTokenPrices, ICoinGeckoMarkets, removeDuplicates} from './CoinGecko'
import moment from "moment-timezone";
import {computeTimeElapsed, TimeUnits} from "../../Utils/TimeUtils";
import {sendEmail, Users} from "../../Utils/MessageUtils/emailer";
import {queryHelper, QueryHelper} from "../../GraphQL/QueryHelper";
import * as Timer from "../../Utils/Timer";
import {timer} from "../../Utils/Timer";
import {getTokenNameHash,getTokens,TokenHash} from "../../Exchanges/UniswapV3/Tokens/Tokens";



