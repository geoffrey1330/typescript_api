create table event
(
    id           varchar    not null,
    enabled      boolean default false
)

create sequence user_id_seq maxvalue 2147483647;
create table users
(
    id              integer                  default nextval('user_id_seq'::regclass) not null,
    email           varchar(255)
        constraint proper_email check ((email)::text ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text)
        not null,
)