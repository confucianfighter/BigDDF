CREATE OR REPLACE FUNCTION before_coin_gecko_coins_upsert() RETURNS trigger AS $BODY$
BEGIN
    BEGIN
        IF NEW.last_updated > OLD.last_updated THEN
            RETURN NEW;
        ELSE
            return OLD;
        END IF;
    END;
END;
$BODY$
    LANGUAGE plpgsql VOLATILE
                     COST 100;
ALTER FUNCTION before_coin_gecko_coins_upsert()
    OWNER to postgres;
DROP TRIGGER IF EXISTS coin_gecko_upsert_trigger ON coin_gecko_coins;
CREATE TRIGGER coin_gecko_upsert_trigger
    BEFORE UPDATE
    ON coin_gecko_coins
    FOR EACH ROW
EXECUTE PROCEDURE before_coin_gecko_coins_upsert();