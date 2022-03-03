
insert into coin_gecko_coins (
    id,
    symbol,
    name,
    image,
    last_updated,
    current_price,
    market_cap,
    market_cap_rank,
    fully_diluted_valuation,
    total_volume,
    high_24h,
    low_24h,
    price_change_24h,
    price_change_percentage_24h,
    market_cap_change_24h,
    market_cap_change_percentage_24h,
    circulating_supply,
    total_supply,
    max_supply,
    ath,
    ath_change_percentage,
    ath_date,
    atl,
    atl_change_percentage,
    atl_date,
    roi
)
values(
          'bitcoin',
          'btc',
          'Bitcoin',
          'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
          '2022-02-09T20:34:25.382Z',
          44646,
          844616070192,
          1,
          935822587315,
          21177259543,
          44623,
          43309,
          886.64,
          2.02615,
          17981182639,
          2.17523,
          18953312,
          21000000,
          21000000,
          69045,
          -35.58956,
          '2021-11-10T14:24:11.849Z',
          67.81,
          65484.27268,
          '2013-07-06T00:00:00.000Z',
          null
      )
on conflict(symbol)
    do update
    SET id = 'bitcoin',
        symbol = 'btc',
        name = 'Bitcoin',
        image = 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        last_updated = '2022-02-09T20:34:25.382Z',
        current_price = 44646,
        market_cap = 844616070192,
        market_cap_rank = 1,
        fully_diluted_valuation = 935822587315,
        total_volume = 21177259543,
        high_24h = 44623,
        low_24h = 43309,
        price_change_24h = 886.64,
        price_change_percentage_24h = 2.02615,
        market_cap_change_24h = 17981182639,
        market_cap_change_percentage_24h = 2.17523,
        circulating_supply = 18953312,
        total_supply = 21000000,
        max_supply = 21000000,
        ath = 69045,
        ath_change_percentage = -35.58956,
        ath_date = '2021-11-10T14:24:11.849Z',
        atl = 67.81,
        atl_change_percentage = 65484.27268,
        atl_date = '2013-07-06T00:00:00.000Z',
        roi = null;
