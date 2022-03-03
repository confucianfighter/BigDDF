#!/bin/bash
echo "Releasing the Hounds!"
node PriceData/CoinGecko/coin-gecko-service.js&
node TradeAdvisor/TradeAdvisor.js

