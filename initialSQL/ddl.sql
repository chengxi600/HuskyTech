--DESIGNED FOR THE RDBMS: MariaDB (MYSQL FLAVOR)
CREATE DATABASE huskytech;
USE huskytech;
CREATE TABLE Employee (
username varchar(20) NOT NULL,
PRIMARY KEY (username),
passkey varchar(70) NOT NULL,
firstName varchar(20) NOT NULL,
lastName varchar(20) NOT NULL,
title varchar(20) NOT NULL,
reportTo varchar(20),
FOREIGN KEY (reportTo) REFERENCES Employee(username)
);

CREATE TABLE Store (
state varchar(20),
city varchar(20),
zip char(5), 
manager varchar(20) NOT NULL,
FOREIGN KEY (manager) REFERENCES Employee(username),
PRIMARY KEY (state, city, zip)
);

CREATE TABLE OnlineStore (
url varchar(255), 
ofState varchar(20), 
ofCity varchar(20), 
ofZip char(5), 
PRIMARY KEY (url, ofState, ofCity, ofZip), 
FOREIGN KEY (ofState, ofCity, ofZip) REFERENCES Store(state, city, zip)
);

CREATE TABLE WorksAt ( 
employeeUsername varchar(20),
ofState varchar(20),
ofCity varchar(20), 
ofZip char(5), 
PRIMARY KEY (employeeUsername, ofState, ofCity, ofZip), 
FOREIGN KEY (employeeUsername) REFERENCES Employee(username), 
FOREIGN KEY (ofState, ofCity, ofZip) REFERENCES Store(state, city, zip)
);

CREATE TABLE Customer (
username varchar(20) NOT NULL,
passkey varchar(70) NOT NULL,
firstName varchar(20) NOT NULL,
lastName varchar(20) NOT NULL,
PRIMARY key (username)
);

CREATE TABLE Orders (
orderNum int,
customerUsername varchar(20),
PRIMARY Key (orderNum, customerUsername),
FOREIGN Key (customerUsername) REFERENCES Customer(username)
);
 

CREATE Table OnlineOrder (
orderNum int,
customerUsername varchar(20), 
state ENUM("sent", "processed", "delivered", "lost") NOT NULL, 
ofState varchar(20) NOT NULL, 
ofCity varchar(20) NOT NULL, 
ofZip char(5) NOT NULL, 
ofStreet varChar(50) NOT NULL, 
PRIMARY Key (orderNum, customerUsername), 
FOREIGN Key (customerUsername, orderNum) REFERENCES Orders(customerUsername, orderNum) 
);

CREATE Table merchandiseType (
brand varchar(15),
model varchar(30),
price int CHECK (price > 0),
PRIMARY KEY (brand, model)
);

CREATE TABLE Phone (
brand varchar(15),
model varchar(30),
operateSys varchar(20) NOT NULL,
space int NOT NULL,
PRIMARY KEY (brand, model)
);

CREATE TABLE Color (
brand varchar(15), 
model varchar(30), 
color varchar(15), 
PRIMARY KEY (brand, model, color), 
FOREIGN KEY (brand, model) REFERENCES phone(brand, model)
);

CREATE TABLE Carrier (
brand varchar(15), 
model varchar(30), 
carrier varchar(20), 
PRIMARY KEY (brand, model, carrier), 
FOREIGN KEY (brand, model) REFERENCES phone(brand, model)
);

CREATE TABLE Laptop (
brand varchar(15), 
model varchar(30), 
processor varchar(40) NOT NULL, 
ram int Check (ram > 0),
PRIMARY KEY (brand, model), 
FOREIGN KEY (brand, model) REFERENCES merchandisetype(brand, model)
);

CREATE TABLE desktop (
brand varchar(15), 
model varchar(30), 
processor varchar(40) NOT NULL, 
ram int Check (ram > 0),
PRIMARY KEY (brand, model), 
FOREIGN KEY (brand, model) REFERENCES merchandisetype(brand, model)
);


CREATE TABLE merchandise (
serial varchar(50),
PRIMARY KEY (serial),
brandType varchar(15) NOT NULL,
modelType varchar(30) NOT NULL,
shelfCity varchar(20) NOT NULL,
shelfState varchar(20) NOT NULL,
shelfZIP varchar(5) NOT NULL,
orderID int,
customerUsername varchar(20),
FOREIGN KEY (brandType, modelType) REFERENCES merchandiseType (brand, model),
FOREIGN KEY (shelfState, shelfCity, shelfZIP) REFERENCES Store(state, city, zip),
FOREIGN KEY (orderID, customerUsername) REFERENCES Orders(orderNum, customerUsername)
);

CREATE TABLE Review (
brandType varchar(15),
modelType varchar(30),
customerUsername varchar(20),
rating int CHECK (rating >= 1  AND rating <= 10),
descr varchar(255),
PRIMARY KEY(brandType, modelType, customerUsername),
FOREIGN KEY(brandType, modelType) REFERENCES merchandiseType(brand, model),
FOREIGN KEY(customerUsername) REFERENCES Customer(username)
);