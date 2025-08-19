create database if not exists poctypeorm2025;

create user if not exists dsw@'%' identified by 'dsw';
grant all on poctypeorm2025.* to dsw@'%';