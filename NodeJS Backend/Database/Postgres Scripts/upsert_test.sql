DROP TABLE upsert_test_table;
create table if not exists upsert_test_table (
    name varchar not null,
    date timestamp,
    address varchar
);
insert into upsert_test_table(
    name,
    last_updated,
    address
)
values (
    'daylan',
     now() - interval '10 day',
    '220 E University'
);
insert into upsert_test_table(
    name,
    last_updated,
    address
)
values (
   'daylan',
    now(),
   '90210'
)
on conflict(name) do update
set name = 'daylan',
    date = now(),
    address = '90210';


insert into upsert_test_table(
    name,
    last_updated,
    address
)
values (
           'daylan',
           now() - interval '10 week',
           'the slums of shaolin'
       )
on conflict(name) do update
    set name = 'daylan',
        last_updated = now() - interval '10 week',
        address = 'the slums';

insert into upsert_test_table(
    name,
    last_updated,
    address
)
values (
           'daylan',
           now() - interval '10 week',
           'the slums'
       );

insert into upsert_test_table(
    name,
    last_updated,
    address
)
values (
           'daylan',
           now(),
           'MOVING ON UP'
       );

delete from upsert_test_table where name='daylan';

