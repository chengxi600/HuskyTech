# 1.Update an online order for a customer
# Note: orderNum and customerId can be parameterized

# Sent online order
UPDATE OnlineOrder 
SET state = 'sent' 
WHERE orderNum = 12093 AND customerId = 28474;

# Place online order 
UPDATE OnlineOrder
 SET state = 'processed' 
WHERE orderNum = 12093 AND customerId = 28474;

# Delivered online order 
UPDATE OnlineOrder
SET state= 'delivered'
WHERE orderNum = 12093 AND customerId = 28474;

# Online order lost
UPDATE OnlineOrder
SET state ='lost'
WHERE orderNum = 12093 AND customerId = 28474;

# 2. Create a purchase an order for a customer
# Note: The orderId, customerId, and serial can all be parameterized

#Create an instore purchase order
START TRANSACTION;
INSERT INTO Orders
VALUES (29185, 29401);

UPDATE Merchandise
SET orderID = 29184, customerID = 29401
WHERE serial = "#224242";

COMMIT;


#Create an online purchase order
START TRANSACTION;
INSERT INTO Orders 
VALUES (32475, 29401);

INSERT INTO OnlineOrder(orderNum, customerId, state, ofZip, ofCity, ofState, ofStreet)
VALUES (32473, 29401,  "processed", "12314", "Springfield", "Illinois", "24 Simpson Grove");
COMMIT;

#3. Create a review for a customer
INSERT INTO Review(reviewId, brandType, modelType, customerId, rating, descr)
VALUES
(99, "HP", "HP Z2 Mini G4", 28474, 3, "The product is so bad its damaging the harry potter brand too");

#4. Add a new merchandise type
#This query is hardcoded to add a chrome book but the brand, model, and price can be parameterized #such that we can produce an API that takes in those 3 fields by user input and automatically input this 
#query into the database
INSERT INTO merchandiseType
VALUES 
("Google", "Chromebook", 75);

#5. Add new merchandise
INSERT INTO merchandise
VALUES
("#20020202", "Dell", "XPS 15", "Portland", "Oregon", "17233", 77623, 39210);


#6. Get the total price of an order of a customer 
#in this query, it gets the total price of an order of a specific customer, but the customer and order can be
#changed such that any order of any customer can be checked for the price

SELECT c.firstName, c.lastName, SUM(mt.price)
FROM Customers c 
INNER JOIN Orders o ON c.registrationId = o.customerId
INNER JOIN Merchandise m ON o.orderNum = m.orderId AND o.customerId = m.customerId
INNER JOIN MerchandiseType mt ON  m.brandType = mt.brand AND m.modelType = mt.model
WHERE c.registrationId  = 29401 AND o.orderNum = 32473;


#7. Get a list of merchandises selling at a specific store in descending order by price
#“Portland”, “Oregon”, and “17233” and be replaced by any city, state, and zip that represents a store in the database
SELECT Merchandise.serial, Merchandise.brandType, Merchandise.modelType 
FROM Merchandise
INNER JOIN Store ON (Store.City = Merchandise.shelfCity AND Store.State = Merchandise.shelfState AND Store.Zip = Merchandise.shelfZip)
INNER JOIN MerchandiseType ON (MerchandiseType.brand = Merchandise.brandType AND MerchandiseType.model = Merchandise.modelType)
WHERE Store.City = "Portland" AND Store.State = "Oregon" AND Store.Zip = "17233"
ORDER BY MerchandiseType.price DESC;


#8. Get the total revenue of every stores
SELECT s.state, s.city, s.zip, SUM(mt.price)
FROM store s 
	LEFT JOIN Merchandise m ON (s.state = m.shelfState AND s.city = m.shelfcity AND s.zip = m.shelfZip)
	INNER JOIN MerchandiseType mt ON (m.brandType = mt.brand AND m.modelType = mt.model)
WHERE m.orderId IS NOT NULL and m.customerID IS NOT NULL
GROUP BY s.state, s.city, s.zip;


#9. Get the highest rated brand and model
SELECT p.brandName, p.modelName, p.rating
FROM (SELECT mt.brand as brandName, mt.model as modelName, AVG(r.rating) as rating 
      FROM merchandiseType mt INNER JOIN review r ON (mt.brand = r.brandType AND mt.model = r.modelType) 
      GROUP BY mt.brand, mt.model) p INNER JOIN 
      (SELECT AVG(r.rating) as rating 
       FROM MerchandiseType mt 
       INNER JOIN review r ON (mt.brand = r.brandType AND mt.model = r.modelType) 
       GROUP BY mt.brand, mt.model 
       ORDER BY rating  DESC 
       LIMIT 1) q ON p.rating = q.rating;



#10. Get the total inventory of a specific merchandise type at a selected store.
#the location of the store and the brand and model of the merchandise can be parameterized
SELECT COUNT(*)
FROM Merchandise 
INNER JOIN store ON (store.City = Merchandise.shelfCity AND store.State = Merchandise.shelfState AND store.ZIP = Merchandise.shelfZIP) 
INNER JOIN MerchandiseType ON (merchandise.brandType = merchandiseType.brand AND Merchandise.modelType = merchandiseType.model)
WHERE MerchandiseType.brand = "Apple" AND MerchandiseType.model = "IPhone 11" AND Store.state = "Washington" AND store.city = "Seattle" AND store.ZIP = "12921";
