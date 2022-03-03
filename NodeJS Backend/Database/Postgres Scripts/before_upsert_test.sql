CREATE OR REPLACE FUNCTION before_upsert_test() RETURNS trigger AS $BODY$
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
ALTER FUNCTION before_upsert_test()
    OWNER to postgres;
DROP TRIGGER IF EXISTS upsert_test_trigger ON upsert_test_table;
CREATE TRIGGER upsert_test_trigger
    BEFORE UPDATE
    ON upsert_test_table
    FOR EACH ROW
        EXECUTE PROCEDURE before_upsert_test();


