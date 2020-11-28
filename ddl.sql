Create Database huskytech;
CREATE TABLE Employee (
id int,
PRIMARY KEY (id),
firstName varchar(20) NOT NULL,
lastName varchar(20) NOT NULL,
title varchar(20) NOT NULL,
reportTo int,
FOREIGN KEY (reportTo) REFERENCES Employee(id)
);

CREATE TABLE Store (
state varchar(20),
city varchar(20),
zip char(5), 
manager int NOT NULL,
FOREIGN KEY (manager) REFERENCES Employee(id),
PRIMARY KEY (state, city, zip)
);

CREATE TABLE OnlineStores (
url varchar(255), 
ofState varchar(20), 
ofCity varchar(20), 
ofZip char(5), 
PRIMARY KEY (url, ofState, ofCity, ofZip), 
FOREIGN KEY (ofState, ofCity, ofZip) REFERENCES store(state, city, zip)
);

CREATE TABLE WorksAt ( 
employeeId int,
ofState varchar(20),
ofCity varchar(20), 
ofZip char(5), 
PRIMARY KEY (employeeId, ofState, ofCity, ofZip), 
FOREIGN KEY (employeeId) REFERENCES employee(id), 
FOREIGN KEY (ofState, ofCity, ofZip) REFERENCES store(state, city, zip)
);

CREATE Table Customers (
registrationId int,
firstName varchar(20) NOT NULL,
lastName varchar(20) NOT NULL,
passKey varchar(20) NOT NULL,
PRIMARY key (registrationId)
);

CREATE Table Orders (
orderNum int,
customerId int,
PRIMARY Key (orderNum, customerId),
FOREIGN Key (customerId) REFERENCES customers(registrationId)
);
 

CREATE Table OnlineOrder (
orderNum int,
customerId int, 
state ENUM("sent", "processed", "delivered", "lost") NOT NULL, 
ofState varchar(20) NOT NULL, 
ofCity varchar(20) NOT NULL, 
ofZip char(5) NOT NULL, 
ofStreet varChar(50) NOT NULL, 
PRIMARY Key (orderNum, customerId), 
FOREIGN Key (customerId, orderNum) REFERENCES orders(customerId, orderNum) 
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

CREATE TABLE Colors (
brand varchar(15), 
model varchar(30), 
color varchar(15), 
PRIMARY KEY (brand, model, color), 
FOREIGN KEY (brand, model) REFERENCES phone(brand, model)
);

CREATE TABLE Carriers (
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
customerID int,
FOREIGN KEY (brandType, modelType) REFERENCES merchandiseType (brand, model),
FOREIGN KEY (shelfState, shelfCity, shelfZIP) REFERENCES Store(state, city, zip),
FOREIGN KEY (orderID, customerID) REFERENCES orders(orderNum, customerID)
);

CREATE TABLE Review (reviewID int,
brandType varchar(15) ,
modelType varchar(30),
customerId int,
rating int CHECK (rating >= 1  AND rating <= 10),
descr varchar(255),
PRIMARY KEY(reviewID, brandType, modelType, customerID),
FOREIGN KEY(brandType, modelType) REFERENCES merchandiseType(brand, model),
FOREIGN KEY(customerID) REFERENCES customers(registrationID)
);