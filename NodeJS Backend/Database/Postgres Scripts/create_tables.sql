
CREATE TABLE IF NOT EXISTS price_history(
    symbol varchar(150) not null,
    timestamp timestamp not null,
    price decimal,
    total_volume decimal,
    market_cap decimal,
    PRIMARY KEY (symbol, timestamp)
);
DROP TABLE coin_gecko_coins;
CREATE TABLE IF NOT EXISTS coin_gecko_coins(
id                               varchar not null primary key,
symbol                           varchar,
name                             varchar,
image                            varchar,
last_updated                     timestamp with time zone,
current_price                    decimal,
market_cap                       decimal,
market_cap_rank                  decimal,
fully_diluted_valuation          decimal,
total_volume                     decimal,
high_24h                         decimal,
low_24h                          decimal,
price_change_24h                 decimal,
price_change_percentage_24h      decimal,
market_cap_change_24h            decimal,
market_cap_change_percentage_24h decimal,
circulating_supply               decimal,
total_supply                     decimal,
max_supply                       decimal,
ath                              decimal,
ath_change_percentage            decimal,
ath_date                         timestamp with time zone,
atl                              decimal,
atl_change_percentage            decimal,
atl_date                         timestamp with time zone,
roi                              decimal
);
