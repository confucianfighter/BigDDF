CREATE OR REPLACE FUNCTION update_price_history_table_notify() RETURNS trigger AS $BODY$
BEGIN
    PERFORM pg_notify('price_history_table_update', tg_table_name::text);
    RETURN NEW;
END;
$BODY$
    LANGUAGE plpgsql VOLATILE
                     COST 100;
ALTER FUNCTION update_price_history_table_notify()
    OWNER to postgres;
DROP TRIGGER update_price_history_table_notify_trigger ON price_history;
CREATE TRIGGER update_price_history_table_notify_trigger
    AFTER INSERT OR UPDATE
    ON price_history
    FOR EACH STATEMENT
EXECUTE PROCEDURE update_price_history_table_notify();

