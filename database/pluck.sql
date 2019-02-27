DROP DATABASE IF EXISTS pluck;
CREATE DATABASE pluck;
-- command for root user and no password
-- mysql -u root < database/pluck.sql
-- DROP TABLE IF EXISTS Users;

USE pluck;
        
-- USERS table to hold id, address, zip, username and hashed password
CREATE TABLE users (
  id INTEGER AUTO_INCREMENT NOT NULL,
  address TEXT(4294967295) NOT NULL,
  zipcode INT NOT NULL,
  username VARCHAR(50) NOT NULL,
  password TEXT(4294967295) NOT NULL,
  salt VARCHAR(100) NOT NULL,
  loggedIn VARCHAR(50) NOT NULL DEFAULT 'true',
  PRIMARY KEY (id)
);

-- PLANTS TABLE to hold id, plant name, adress, zip and toggled 
-- populated to auto complete user query
CREATE TABLE plants (
  id INTEGER AUTO_INCREMENT NOT NULL,
  plant TEXT NOT NULL,
  address TEXT(4294967295) NOT NULL,
  zipcode INT NOT NULL,
  toggled BOOLEAN,
  PRIMARY KEY (id)
);

-- PLANT DATA TABLE
-- to hold youtube links to each plant
CREATE TABLE plantData (
  id INTEGER AUTO_INCREMENT NOT NULL,
  planttype VARCHAR(255) NOT NULL,
  imagelink TEXT(4294967295) NOT NULL,
  PRIMARY KEY (id)
);


-- JOIN table, holds user/plant links
CREATE TABLE usersPlants (
  id INTEGER AUTO_INCREMENT NOT NULL,
  iduser INTEGER NOT NULL,
  idplant INTEGER NOT NULL,
  PRIMARY KEY (id)
);