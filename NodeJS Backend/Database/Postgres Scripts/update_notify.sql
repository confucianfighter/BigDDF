CREATE OR REPLACE FUNCTION update_notify() RETURNS trigger AS $BODY$
BEGIN
    PERFORM pg_notify('new_price',NEW.price::text);
    RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql VOLATILE
COST 100;
ALTER FUNCTION update_notify()
OWNER to postgres;

CREATE TRIGGER update_notify_trigger
    AFTER INSERT
    ON price_history
    FOR EACH ROW
    EXECUTE PROCEDURE update_notify();

