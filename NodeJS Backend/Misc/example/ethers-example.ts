import {Pool, Route, Trade} from "@uniswap/v3-sdk";
import { ethers } from "ethers";
import { Address } from "cluster";
import {CurrencyAmount, Token, TradeType, Price, Percent, NativeCurrency} from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { AlphaRouter } from "@uniswap/smart-order-router";
//import JSBI from "jsbi";

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/c696501080344af183d1d2e0c5578ad7");
const poolAddress:string = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
const quoterAddress:string = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"
const quoterContract = new ethers.Contract(quoterAddress, QuoterABI, provider);



const poolImmutablesAbi = [
    "function factory() external view returns (address)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function fee() external view returns (uint24)",
    "function tickSpacing() external view returns (int24)",
    "function maxLiquidityPerTick() external view returns (uint128)",
];

const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
);

//export interface Immutables {
//    factory: Address;
//    token0: Address;
//    token1: Address;
//    fee: number;
//    tickSpacing: number;
//    maxLiquidityPerTick: number;
//}

export interface Immutables {
    factory: string;
    token0: string;
    token1: string;
    fee: number;
    tickSpacing: number;
    maxLiquidityPerTick: ethers.BigNumber;
}

export interface State {
    liquidity: ethers.BigNumber;
    sqrtPriceX96: ethers.BigNumber;
    tick: number;
    observationIndex: number;
    observationCardinality: number;
    observationCardinalityNext: number;
    feeProtocol: number;
    unlocked: boolean;
}
export async function getPoolImmutables() {
    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
        await Promise.all([
            poolContract.factory(),
            poolContract.token0(),
            poolContract.token1(),
            poolContract.fee(),
            poolContract.tickSpacing(),
            poolContract.maxLiquidityPerTick(),
        ]);

    const immutables: Immutables = {
        factory,
        token0,
        token1,
        fee,
        tickSpacing,
        maxLiquidityPerTick,
    };
    return immutables;
}

//getPoolImmutables().then((result) => {
//    console.log(result);
//});

export async function getPoolState() {
    const [liquidity, slot] = await Promise.all([
        poolContract.liquidity(),
        poolContract.slot0()
    ]);

    const PoolState: State = {
        liquidity,
        sqrtPriceX96: slot[0],
        tick: slot[1],
        observationIndex: slot[2],
        observationCardinality: slot[3],
        observationCardinalityNext: slot[4],
        feeProtocol: slot[5],
        unlocked: slot[6],
    };

    return PoolState;
}

async function main() {
    const [immutables, state] = await Promise.all([
    getPoolImmutables(),
    getPoolState(),
    ]);

    const TokenA = new Token(3, immutables.token0, 6, "USDC", "USD Coin");

    const TokenB = new Token(3, immutables.token1, 18, "WETH", "Wrapped Ether");

    const USDC_WETH_POOL = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
    );

    const amountIn = 1500;
    const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        immutables.token0,
        immutables.token1,
        immutables.fee,
        amountIn.toString(),
        0
    );

    const swapRoute = new Route([USDC_WETH_POOL], TokenA, TokenB);

    const uncheckedTradeExample = await Trade.createUncheckedTrade({
        route: swapRoute,
        inputAmount: CurrencyAmount.fromRawAmount(TokenA, amountIn.toString()),
        outputAmount: CurrencyAmount.fromRawAmount(
            TokenB,
            quotedAmountOut.toString()
        ),
        tradeType: TradeType.EXACT_INPUT,
    });

   console.log("The quoted amount out is", quotedAmountOut.toString());
   console.log("The unchecked trade object is", uncheckedTradeExample);

   const token0Price = USDC_WETH_POOL.token0Price;
   const token1Price = USDC_WETH_POOL.token1Price;
   console.log(`USDC Price is ${token0Price.toFixed()}.`);
   console.log(`WETH Price is ${token1Price.toFixed()}`);
    const router = new AlphaRouter({ chainId: 1, provider: provider });
    const route = await router.route(
        CurrencyAmount.fromRawAmount( TokenA, 1000),
        TokenB ,
       TradeType.EXACT_INPUT,
       {
            recipient: "0x7a1f3B8644C4bf855f0b727B3FC3907A8EcfC83A",
            slippageTolerance: new Percent(5, 100),
            deadline: 10
    });
    console.log(route);
}

async function fetchSpotPrice()
{

}

main();