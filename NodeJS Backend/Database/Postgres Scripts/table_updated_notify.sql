CREATE OR REPLACE FUNCTION table_update_notify() RETURNS trigger AS $BODY$
DECLARE
  name varchar(150);
  timestamp timestamp;
  price bigint;

BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    name = NEW.name;
    timestamp = new.timestamp;
    price = new.price;
  ELSE
    name = old.name;
    timestamp = old.timestamp;
    price = old.price;
  END IF;
  PERFORM pg_notify('table_update', json_build_object('table', TG_TABLE_NAME, 'name', name, 'timestamp', timestamp, 'price',price, 'type', TG_OP)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;