DROP FUNCTION update_price_each_row_notify CASCADE;
CREATE OR REPLACE FUNCTION update_price_each_row_notify() RETURNS trigger AS $BODY$
DECLARE
    symbol varchar;
    timestamp timestamp;
    price decimal;
    is_new boolean;
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN

        symbol = new.symbol;
        price = new.price;
        timestamp = new.timestamp;
        is_new = true;
        PERFORM pg_notify('price_update', json_build_object('table', TG_TABLE_NAME,'is_new', is_new, 'symbol', symbol, 'timestamp', timestamp, 'price',price, 'type', TG_OP)::text);
        RETURN new;
    ELSE
        /*timestamp = old.timestamp;*/
        /*price = old.price;*/
        is_new = false;
    END IF;
END;
$BODY$
    LANGUAGE plpgsql VOLATILE
                     COST 100;
ALTER FUNCTION update_price_each_row_notify()
    OWNER to postgres;
DROP TRIGGER update_price_each_row_notify_trigger ON price_history;
CREATE TRIGGER update_price_each_row_notify_trigger
    AFTER INSERT OR UPDATE
    ON price_history
    FOR EACH ROW
EXECUTE PROCEDURE update_price_each_row_notify();

