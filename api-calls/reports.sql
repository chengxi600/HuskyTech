#1. Get the list of customers who are eligible to receive an Apple discount, ordered by lastName, customerID (A customer can receive a discount if they spend more than 3000 dollars on Apple products at a single location)
#This query currently uses “Apple” and 3000, but it can be parameterized such that a sequence can get a #String representing a brand name and an integer representing minimum price, and use this query to see what customers qualify for any brand and for any threshold value, useful for finding loyal customers of a particular brand.

SELECT
    Customers.firstName AS firstName,
    customers.lastName AS lastName
FROM
    Customers
INNER JOIN(
    SELECT
  customers.registrationId as customerId, SUM(merchandisetype.price) as totalSpent
FROM
    Customers
INNER JOIN Orders ON Orders.customerId = customers.registrationId
INNER JOIN Merchandise ON (Merchandise.customerID = orders.customerID AND merchandise.orderID = orders.orderNum)
INNER JOIN MerchandiseType ON(
        Merchandise.brandtype = merchandiseType.brand AND merchandise.modelType = merchandiseType.model
    )
WHERE
    MerchandiseType.brand = "Apple"
GROUP BY 
	customers.registrationId
) AS t1
ON
    t1.customerID = customers.registrationID
WHERE
    t1.totalSpent > 3000
ORDER BY
    lastName,
    Customers.registrationID;

#2. Get the list of stores that have already met their quarterly goal of selling at least $2000 worth of merchandise (either online or in-person). However, a store cannot count an online order as a successful sale if it was lost in the mail. Order the stores by the amount of proceeds they’ve made in descending order; break ties by ordering the stores in alphabetical order of the US state that they’re located in.

SELECT
    Store.State,
    Store.City,
    Store.Zip,
    SUM(MerchandiseType.price) AS Proceeds
FROM
    Store
INNER JOIN Merchandise ON(
        Merchandise.shelfCity = Store.City AND Merchandise.shelfState = Store.State AND Merchandise.shelfZip = Store.Zip
    )
INNER JOIN MerchandiseType ON(
        Merchandise.brandType = MerchandiseType.brand AND Merchandise.modelType = MerchandiseType.model
    )
INNER JOIN Orders ON(
        Merchandise.orderId = Orders.orderNum AND Merchandise.customerId = Orders.customerId
    )
WHERE
    Orders.customerId NOT IN(
    SELECT
        customerId
    FROM
        onlineorder
    WHERE
        state = 'lost'
) AND Orders.orderNum NOT IN(
    SELECT
        orderNum
    FROM
        OnlineOrder
    WHERE
        state = 'lost'
)
GROUP BY
    Store.State,
    Store.City,
    Store.Zip
HAVING
    Proceeds > 2000
ORDER BY
    Proceeds DESC ,
    Store.State ASC,
    Store.City ASC;



#3. Get the amount of employees working under managers combined with the amount of sales within the store the manager manages, and order the results by amount of sales then amount of employees. 

SELECT q.manager, p.revenue , q.employees
FROM 
(SELECT e.reportTo as manager, COUNT(e.id) as employees
FROM Employee e 
GROUP BY manager) q 
INNER JOIN
(SELECT s.manager, SUM(mt.price) as revenue
FROM store s 
INNER JOIN Merchandise m ON (s.state = m.shelfState AND s.city = m.shelfcity AND s.zip = m.shelfZip)
INNER JOIN MerchandiseType mt ON (m.brandType = mt.brand AND m.modelType = mt.model)
WHERE m.orderId IS NOT NULL AND m.customerID IS NOT NULL
GROUP BY s.manager) p on 
q.manager = p.manager
ORDER BY p.revenue, q.employees;



#4.Get the number of orders and average rating for a given brand and all models unioned together, ordered by average rating, then number of orders. Returns the models whose rating is at least 5.
#Currently this query has “Apple” and 5.0 hard coded in but this can be parameterized such that every #query can be used to determine what model from a given brand is successful and the threshold for success can also be parameterized.

SELECT MerchandiseType.model AS model, COUNT(Orders.orderNum) AS num_orders, Format(AVG(Review.rating), 1) AS avg_rating
FROM 
	Merchandise INNER JOIN Orders ON (Merchandise.orderId = Orders.orderNum AND Merchandise.customerId = Orders.customerId)
	INNER JOIN MerchandiseType ON (Merchandise.brandType = MerchandiseType.brand AND Merchandise.modelType = MerchandiseType.model)
	INNER JOIN Review ON (MerchandiseType.brand = Review.brandType AND MerchandiseType.model = Review.modelType)
WHERE brand = "Apple"
GROUP BY MerchandiseType.brand, MerchandiseType.model
HAVING AVG(Review.rating) >= 5.0
ORDER BY avg_rating DESC, num_orders DESC;

#5.Given a store, get a list of customers with the sum of the orders and online orders purchased by the customer, also return the average review a customer has made.
#here we had seattle, washington, and 12921 to identify the store but this query can be parameterized to include any store, this is useful so we can see which stores have the most business but also customer satisfaction.

SELECT
    Customers.firstName AS firstName,
    Customers.lastName AS lastName,
    COUNT(*) AS orderCount,
    Format(AVG(Review.rating), 1)  as avgRating
FROM
    Customers 
    INNER JOIN Orders ON Customers.registrationID = orders.customerID
    INNER JOIN merchandise ON merchandise.orderID = orders.orderNum AND merchandise.customerID = orders.customerId
    INNER JOIN Store ON store.city = merchandise.shelfCity AND store.state = merchandise.shelfState AND store.zip = merchandise.shelfZIP
    LEFT OUTER JOIN review ON customers.registrationId = review.customerId AND review.brandType = merchandise.brandType AND merchandise.modelType = review.modelType
    WHERE store.city = "Seattle" AND store.state = "Washington" AND store.zip ="12921"
GROUP BY customers.registrationId
ORDER BY orderCount DESC, avgRating;
