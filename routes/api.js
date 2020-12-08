const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//establish the connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'huskytech'
});
//log whether the connection is successful
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to database server: ' + err.stack);
        return;
    }
    console.log('Connected to database server as id ' + connection.threadId);
});


//check if username exists, if not add it to database, adding a salted and hashed password
router.post('/signup', function (req, res, next) {
    console.log(req.body);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    let password = req.body.password;

    //get all users for customers and employees, if it matches, send response with error
    connection.query('SELECT Customer.username FROM Customer UNION SELECT Employee.username FROM Employee', function (error, results, fields) {
        if (error) {
            res.json({
                status: 'failure',
                body: "Something went wrong with the server's database."
            })
        } else {
            let returnArr = [];
            results.forEach(element => {
                returnArr.push(element.username);
            })
            if (returnArr.includes(username)) {
                res.json({
                    status: 'failure',
                    body: "Please choose a non-existing username."
                })
            } else { //if original username, add it to database 

                bcrypt.genSalt(saltRounds, function (err, salt) { //generate salt and hash
                    bcrypt.hash(password, salt, function (err, hash) {
                        // Store hash into database
                        connection.query('INSERT INTO Customer (firstName, lastName, userName, passKey) VALUES ' +
                            '(?, ?, ?, ?);', [firstName, lastName, username, hash], function (error, results, fields) {
                                if (error) {
                                    res.json({
                                        status: 'failure',
                                        body: "Something went wrong with the server's database."
                                    })
                                } else {
                                    res.json({
                                        status: 'success',
                                        body: "http://localhost:3000/u-home"
                                    })
                                }
                            });
                    });
                });
            }
        }
    });
});

//login in requests
router.post('/login', function (req, res, next) {
    connection.query('SELECT Customer.username FROM Customer', function (error, results, fields) {
        let username = req.body.username;
        let password = req.body.password;
        if (error) {
            res.json({
                status: 'failure',
                body: "Something went wrong with the server's database."
            })
        } else { //get all the usernames of customers, if its a match then compare the passwords
            let userArr = [];
            results.forEach(element => {
                userArr.push(element.username);
            })
            if (userArr.includes(username)) { //if in usernames of customers
                connection.query('SELECT Customer.passkey FROM Customer ' +
                    'WHERE Customer.username = ' + connection.escape(username), function (error, results, fields) {
                        let myhash = results[0].passkey;
                        console.log(myhash);
                        bcrypt.compare(password, myhash, function (err, result) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    status: 'failure',
                                    body: "Invalid username and/or password. Try again."
                                })
                            } else {
                                if (result) {
                                    res.json({
                                        status: 'success',
                                        body: "http://localhost:3000/u-home"
                                    })
                                } else {
                                    res.json({
                                        status: 'failure',
                                        body: "Invalid username and/or password. Try again."
                                    })
                                }
                            }
                        });
                    });
            } else { //else get all the usernames of employees, if its a match compare the passwords in employee table
                connection.query('SELECT Employee.username FROM Employee', function (error, results, fields) {
                    if (error) {
                        res.json({
                            status: 'failure',
                            body: "Something went wrong with the server's database."
                        })
                    } else {
                        let employeeArr = [];
                        results.forEach(element => {
                            employeeArr.push(element.username);
                        })
                        if (employeeArr.includes(username)) {
                            connection.query('SELECT Employee.passkey FROM Employee ' +
                                'WHERE Employee.username = ' + connection.escape(username), function (error, results, fields) {
                                    let myhash = results[0].passkey;
                                    bcrypt.compare(password, myhash, function (err, result) {
                                        if (err) {
                                            res.json({
                                                status: 'failure',
                                                body: "Invalid username and/or password. Try again."
                                            })
                                        } else {
                                            res.json({
                                                status: 'success',
                                                body: "http://localhost:3000/e-home"
                                            })
                                        }
                                    });
                                });
                        } else {
                            res.json({
                                status: 'failure',
                                body: "Invalid username and/or password. Try again."
                            })
                        }
                    }
                })
            }
        }
    });
});

router.get('/get-reviews', function (req, res, next) {
    connection.query('SELECT * FROM Review ORDER BY Review.rating DESC', [], function (error, results, fields) {
        if (error) {
            res.json({
                status: "failure",
                body: "Something went wrong with backend"
            })
        } else {
            console.log(results);
            res.json({
                status: "success",
                body: results
            })
        }
    })
})

//returns task query of all merchandisetypes in a store location
router.post('/search-bar', function (req, res, next) {
    let body = req.body;
    let city = body[0];
    let state = body[1];
    let zip = body[2];
    let sortBy = body[3];
    let filter = body[4];

    if (sortBy === "Descending") {
        sortBy = "MerchandiseType.price DESC";
    } else {
        sortBy = "MerchandiseType.price";
    };

    if (filter.length > 0 && filter.every(x => { (x === "Phone" || x === "Laptop" || x === "Desktop") })) {
        res.json({
            status: "failure",
            body: 'Invalid query. Try again. Invalid filter.'
        })
    } else {
        console.log(filter);
        if (filter.length === 0) {
            connection.query('SELECT MerchandiseType.brand, MerchandiseType.model, MerchandiseType.price, Count(*) as stocks ' +
                'FROM Merchandise ' +
                'INNER JOIN Store ON (Store.City = Merchandise.shelfCity AND Store.State = Merchandise.shelfState AND Store.Zip = Merchandise.shelfZip) ' +
                'INNER JOIN MerchandiseType ON (MerchandiseType.brand = Merchandise.brandType AND MerchandiseType.model = Merchandise.modelType) ' +
                'WHERE Store.City = ? AND Store.State = ? AND Store.Zip = ? AND Merchandise.orderId Is Null ' +
                "Group By Merchandisetype.brand, Merchandisetype.model " +
                'ORDER BY ' + sortBy, [city, state, zip], function (error, results, fields) {
                    if (error) {
                        res.json({
                            status: 'failure',
                            body: 'Invalid query. Try again.'
                        });
                    }
                    let returnArr = [];
                    results.forEach(element => {
                        let obj = {};
                        for (const key in element) {
                            obj[key] = element[key];
                        }
                        obj["city"] = city;
                        obj["state"] = state;
                        obj["zip"] = zip;
                        returnArr.push(obj);
                    })
                    res.json({
                        status: 'success',
                        body: returnArr
                    });
                });
        } else {
            let finalList = [];
            let promise = new Promise((resolve, reject) => {
                let count = 0;
                filter.forEach(merchType => {

                    merchTypeBrand = merchType + ".brand";
                    merchTypeModel = merchType + ".model";

                    connection.query('SELECT merchandiseType.brand, merchandiseType.model, merchandiseType.price, Count(*) as stocks ' +
                        'FROM Merchandise ' +
                        'INNER JOIN Store ON (Store.City = Merchandise.shelfCity AND Store.State = Merchandise.shelfState AND Store.Zip = Merchandise.shelfZip) ' +
                        'INNER JOIN merchandiseType ON (MerchandiseType.brand = Merchandise.brandType AND MerchandiseType.model = Merchandise.modelType) ' +
                        'INNER JOIN ' + merchType + ' ON (' + merchTypeBrand + ' = merchandiseType.brand AND ' +
                        merchTypeModel + ' = merchandiseType.model) ' +
                        'WHERE Store.City = ? AND Store.State = ? AND Store.Zip = ? AND Merchandise.orderId Is Null ' +
                        "Group By Merchandisetype.brand, Merchandisetype.model " +
                        'ORDER BY ' + sortBy, [city, state, zip], function (error, results, fields) {
                            if (error) {
                                console.log(error);
                                res.json({
                                    status: 'failure',
                                    body: 'Invalid query. Try again.'
                                })
                            } else {
                                let returnArr = [];
                                results.forEach(element => {
                                    let obj = {};
                                    for (const key in element) {
                                        obj[key] = element[key];
                                    }
                                    obj["city"] = city;
                                    obj["state"] = state;
                                    obj["zip"] = zip;
                                    returnArr.push(obj);
                                })
                                finalList = finalList.concat(returnArr);
                                console.log(returnArr);
                                console.log(finalList);
                                count++;
                                if (count === filter.length) {
                                    resolve();
                                }
                            }
                        });
                })
            });
            promise.then(() => {
                console.log(finalList);
                res.json({
                    status: 'success',
                    body: finalList
                })
            })
        }
    }
})

router.post('/submit-review', function (req, res, next) {
    console.log(req.body[0] + req.body[1] + req.body[2] + req.body[3] + req.body[4])
    connection.query('INSERT INTO Review(brandType, modelType, customerUsername, rating, descr) VALUES (?, ?, ?, ?, ?);',
        [req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]], function (error, results, fields) {
            if (error) {
                res.json({
                    status: "failure",
                    body: "Something went wrong with the database."
                })
            } else {
                res.json({
                    status: "success",
                    body: "Review went through"
                })
            }
        })
})

//returns the get rated brand and model 
router.get('/top-rated', function (req, res, next) {
    connection.query('SELECT p.brandName, p.modelName, p.rating ' +
        'FROM (SELECT mt.brand as brandName, mt.model as modelName, AVG(r.rating) as rating ' +
        'FROM merchandiseType mt INNER JOIN review r ON (mt.brand = r.brandType AND mt.model = r.modelType) ' +
        'GROUP BY mt.brand, mt.model) p INNER JOIN ' +
        '(SELECT AVG(r.rating) as rating ' +
        'FROM MerchandiseType mt ' +
        'INNER JOIN review r ON (mt.brand = r.brandType AND mt.model = r.modelType) ' +
        'GROUP BY mt.brand, mt.model ' +
        'ORDER BY rating  DESC ' +
        'LIMIT 1) q ON p.rating = q.rating;', function (error, results, fields) {
            if (error) {
                res.json({
                    status: "failure",
                    body: "Something went wrong with the database."
                })
            } else {
                res.json({
                    status: "success",
                    body: results[0]
                })
            }
        })
})

//returns a new order number, should be max_num +1 
router.post('/order-number', function (req, res, next) {
    let username = req.body[0];
    console.log(username);
    connection.query('SELECT MAX(Orders.orderNum) as orderNum FROM Customer INNER JOIN Orders ON Orders.customerUsername = Customer.username WHERE Customer.username = ?;',
        [username], function (error, results, fields) {
            if (error) {
                res.json({
                    status: "failure",
                    body: "Something went wrong with the database."
                })
            } else {
                if (results[0].orderNum === null) {
                    res.json({
                        status: "success",
                        body: 0
                    })
                } else {
                    res.json({
                        status: "success",
                        body: results[0].orderNum
                    })
                }

            }
        })
})

router.post('/submit-online-order', function (req, res, next) {
    let body = req.body;
    let oNum = body[0];
    let username = body[1];
    let address = body[2];
    let city = body[3];
    let state = body[4];
    let zip = body[5];
    let status = body[6];


    //creating a new online order for customer
    connection.query(
        'INSERT INTO OnlineOrder(orderNum, customerUsername, state, ofZip, ofCity, ofState, ofStreet) ' +
        'VALUES (?, ?,  ?, ?, ?, ?, ?);', [oNum, username, status, zip, city, state, address], function (err, results, fields) {
            if (err) {
                res.json({
                    status: "failure",
                    body: "Something went wrong with the checkout on the backend."
                })
            } else {
                console.log("online order" + results);
                res.json({
                    status: "success",
                    body: "Order submitted"
                })
            }
        })
})

router.post('/submit-order', function (req, res, next) {
    let body = req.body;
    let oNum = body[0];
    let customerUsername = body[1];
    console.log("submit-order" + body);
    connection.query('INSERT INTO Orders(orderNum, customerUsername) VALUES (?, ?);', [oNum, customerUsername], function (error, results, fields) {
        if (error) {
            res.json({
                status: "failure"
            })
            return;
        }
        res.json({
            status: "success"
        })
    })
})

router.post('/serial-number', function (req, res, next) {
    let body = req.body;
    let brand = body[0];
    let model = body[1];
    let shelfCity = body[2];
    let shelfState = body[3];
    let shelfZip = body[4];
    console.log(body);

    //get an array of serial number from query
    connection.query('SELECT serial FROM Merchandise m WHERE m.brandType = ? AND m.modelType = ? AND m.shelfCity = ? ' +
        'AND m.shelfState = ? AND m.shelfZip = ?', [brand, model, shelfCity, shelfState, shelfZip], function (error, results, fields) {
            if (error) {
                res.json({
                    status: "failure",
                    body: "Something went wrong with the backend"
                })
            } else {
                res.json({
                    status: "success",
                    body: results[0].serial //breaks if one customer orders the same thing twice, or if 2+ customers order one thing
                })
            }
        })
})

router.post('/update-merchandise', function (req, res, next) {
    let body = req.body;
    let serial = body[0];
    let oNum = body[1];
    let customerUsername = body[2];

    console.log("Update merchandise" + serial);
    console.log("Update merchandise" + oNum);
    console.log("Update merchandise" + customerUsername);
    connection.query('UPDATE Merchandise SET orderID = ?, customerUsername = ? WHERE serial = ?',
        [oNum, customerUsername, serial], function (error, results, fields) {
            if (error) {
                res.json({
                    status: "failure",
                    body: "Invalid query. Please try again."
                })
            } else {
                res.json({
                    status: "success",
                    body: "Updated inventory"
                })
            }
        })
})

router.post('/getOrders', function (req, res, next) {
    let customer = req.body.username;
    //Query
    connection.query('SELECT o.orderNum FROM customer c INNER JOIN orders o ON o.customerUsername = c.username ' +
        'WHERE c.username = ?;', [customer], function (error, results, fields) {
            if (error) {
                res.json({
                    status: "failure",
                    body: "Invalid query. Please try again."
                })
            } else {
                let returnObj = {};
                let promise = new Promise((resolve, reject) => {
                    let count = 0;
                    results.forEach(result => {
                        let orderNum = result.orderNum;
                        connection.query('SELECT mt.brand as brand, mt.model as model, mt.price as price FROM orders o INNER JOIN merchandise m ON m.orderID = o.orderNum ' +
                            'AND m.customerUsername = o.customerUsername INNER JOIN merchandisetype mt ON mt.brand = m.brandType AND mt.model = m.modelType ' +
                            'WHERE o.orderNum = ? AND m.customerUsername = ?;', [orderNum, customer], function (error2, results2, fields2) {
                                if (error2) {
                                    res.json({
                                        status: "failure",
                                        body: "Invalid query. Please try again."
                                    })
                                } else {
                                    returnObj[orderNum] = [];
                                    results2.forEach(result => {
                                        returnObj[orderNum].push(result);
                                    })
                                    count++;
                                    if (count === results.length) {
                                        resolve();
                                    }
                                }
                            })
                    })
                })
                promise.then(() => {
                    res.json({
                        status: "success",
                        body: returnObj
                    })
                })
            }
        })
});


router.post('/addMerchType', function (req, res, next) {
    let brand = req.body[0];
    let model = req.body[1];
    let price = req.body[2];

    connection.query('INSERT INTO merchandiseType (brand, model, price) VALUES (?, ?, ?);',
        [brand, model, price], function (error, results, fields) {
            if (error) {
                res.json({
                    status: "failure",
                    body: "Invalid query"
                })
            } else {
                res.json({
                    status: "success"
                })
            }
        });
});

router.post('/update-order-status', function (req, res, next) {
    let customerUsername = req.body[0];
    let orderNum = req.body[1];
    let state = req.body[2];
    connection.query('Update onlineorder Set state = ? WHERE orderNum = ? AND customerUsername = ? ;',
        [state, orderNum, customerUsername], function (error, results, fields) {
            if (error) {
                res.json({
                    status: "failure"
                })
            } else {
                console.log(results);
                res.json({
                    status: "success"
                })
            }
        })
})



// ----------------------------Build this Query----------------------------
// SELECT s.state, s.city, s.zip, SUM(mt.price)
// FROM store s 
// LEFT JOIN Merchandise m ON (s.state = m.shelfState AND s.city = m.shelfcity AND s.zip = m.shelfZip)
// INNER JOIN MerchandiseType mt ON (m.brandType = mt.brand AND m.modelType = mt.model)
// WHERE m.orderId IS NOT NULL and m.customerID IS NOT NULL
// GROUP BY s.state, s.city, s.zip;



router.get("/get-revenue", function (req, res, next) {
    connection.query('SELECT s.city as city, s.state as state, s.zip as zip, SUM(mt.price) as totalRevenue FROM store s LEFT JOIN Merchandise m ON ' +
        '(s.state = m.shelfState AND s.city = m.shelfcity AND s.zip = m.shelfZip) ' +
        'INNER JOIN MerchandiseType mt ON (m.brandType = mt.brand AND m.modelType = mt.model) ' +
        'WHERE m.orderId IS NOT NULL and m.customerUsername IS NOT NULL ' +
        'GROUP BY s.state, s.city, s.zip ORDER BY totalRevenue DESC;', function (err, results, fields) {
            if (err) {
                res.json({
                    status: "failure",
                    body: "Invalid query."
                })
            } else {
                console.log(results);
                res.json({
                    status: "success",
                    body: results
                })
            }
        })
})


// ----------------------------Build this Query----------------------------
// INSERT INTO merchandise
// VALUES
// (Random Generated, Model, Brand, City, State, Zip, null, null);

router.post('/restock', function (req, res, next) {
    let body = req.body;
    let serial = "#" + Math.floor(Math.random() * (10 ** 5));
    console.log(serial);
    let model = body.model;
    let brand = body.brand;
    let city = body.city;
    let state = body.state;
    let zip = body.zip;
    console.log(model);
    connection.query('INSERT INTO merchandise ' +
        '(serial, brandType, modelType, shelfState, shelfCity, shelfZIP, orderID, customerUsername) ' +
        'VALUES (?, ?, ?, ?, ?, ?, NULL, NULL );', [serial, brand, model, state, city, zip], function (error, results, next) {
            if (error) {
                res.json({
                    body: "Invalid query. Please try again."
                })
            } else {
                res.json({
                    body: "Successfully updated merchandise stock."
                })
            }
        });
})

router.post('/discount', function (req, res, next) {
    let body = req.body;
    let brand = body[0];
    let threshold = body[1];

    let sqlString = 'SELECT Customer.firstName AS firstName, customer.lastName AS lastName FROM Customer INNER JOIN( ' +
        'SELECT customer.username as username, SUM(merchandisetype.price) as totalSpent FROM ' +
        'Customer INNER JOIN Orders ON Orders.customerUsername = customer.username ' +
        'INNER JOIN Merchandise ON (Merchandise.customerUsername = orders.customerUsername AND merchandise.orderID = orders.orderNum) ' +
        'INNER JOIN MerchandiseType ON( Merchandise.brandtype = merchandiseType.brand AND merchandise.modelType = merchandiseType.model) ' +
        'WHERE MerchandiseType.brand = ? GROUP BY customer.username) AS t1 ON t1.username = Customer.Username ' +
        'WHERE t1.totalSpent > ? ORDER BY lastName, Customer.username;'
    connection.query(sqlString, [brand, threshold], function (error, results, fields) {
        if (error) {
            res.json({
                status: "failure",
                body: "Invalid query."
            })
        } else {
            res.json({
                status: "success",
                body: results
            })
        }
    })
})

router.get('/get-quota-stores', function (req, res, next) {
    let sqlString = '' +
        'SELECT Store.State, Store.City, Store.Zip, SUM(MerchandiseType.price) AS Proceeds ' +
        'FROM Store INNER JOIN Merchandise ON(' +
        'Merchandise.shelfCity = Store.City AND Merchandise.shelfState = Store.State AND Merchandise.shelfZip = Store.Zip) ' +
        'INNER JOIN MerchandiseType ON(Merchandise.brandType = MerchandiseType.brand AND Merchandise.modelType = MerchandiseType.model) ' +
        'INNER JOIN Orders ON( Merchandise.orderId = Orders.orderNum AND Merchandise.customerUsername = Orders.customerUsername) ' +
        'WHERE ' +
        'Orders.customerUsername NOT IN( SELECT customerUsername FROM onlineorder WHERE state = "lost" ) AND Orders.orderNum NOT IN(' +
        'SELECT orderNum FROM OnlineOrder WHERE state = "lost" ) ' +
        'GROUP BY Store.State, Store.City, Store.Zip ' +
        'HAVING Proceeds > 2000 ' +
        'ORDER BY Proceeds DESC , Store.State ASC, Store.City ASC;'
    connection.query(sqlString, function (error, results, fields) {
        if (error) {
            res.json({
                status: "failure",
                body: "Something went wrong with the server's database."
            })
        } else {
            res.json({
                status: "success",
                body: results
            })
        }
    })
})


router.get('/sales-and-employees', function (req, res, next) {
    let sqlString = 'SELECT q.manager, p.revenue , q.employees FROM  (SELECT e.reportTo as manager, COUNT(e.username) as employees ' +
        'FROM Employee e GROUP BY manager) q INNER JOIN (SELECT s.manager, SUM(mt.price) as revenue FROM store s ' +
        'INNER JOIN Merchandise m ON (s.state = m.shelfState AND s.city = m.shelfcity AND s.zip = m.shelfZip) ' +
        'INNER JOIN MerchandiseType mt ON (m.brandType = mt.brand AND m.modelType = mt.model) ' +
        'WHERE m.orderId IS NOT NULL AND m.customerUsername IS NOT NULL GROUP BY s.manager) p ON q.manager = p.manager ' +
        'ORDER BY p.revenue, q.employees;'
    connection.query(sqlString, function (error, results, fields) {
        if (error) {
            res.json({
                status: "failure",
                body: "Something went wrong with the server's database."
            })
        } else {
            res.json({
                status: "success",
                body: results
            })
        }
    })
})


router.post('/most-popular-ratings', function (req, res, next) {
    let body = req.body;
    let brand = body[0];
    let threshold = body[1];

    let sqlString = '' +
        'SELECT MerchandiseType.model AS model, COUNT(Orders.orderNum) AS num_orders, Format(AVG(Review.rating), 1) AS avg_rating ' +
        'FROM Merchandise INNER JOIN Orders ON (Merchandise.orderId = Orders.orderNum AND Merchandise.customerUsername = Orders.customerUsername) ' +
        'INNER JOIN MerchandiseType ON (Merchandise.brandType = MerchandiseType.brand AND Merchandise.modelType = MerchandiseType.model) ' +
        'INNER JOIN Review ON (MerchandiseType.brand = Review.brandType AND MerchandiseType.model = Review.modelType) ' +
        'WHERE brand = ? GROUP BY MerchandiseType.brand, MerchandiseType.model HAVING AVG(Review.rating) >= ? ' +
        'ORDER BY AVG(Review.rating) DESC, num_orders DESC;'

    connection.query(sqlString, [brand, threshold], function (error, results, fields) {
        if (error) {
            res.json({
                status: "failure",
                body: "Invalid query."
            })
        } else {
            console.log(results);
            res.json({
                status: "success",
                body: results
            })
        }
    })
})

router.post('/top-selling-stores', function (req, res, next) {
    let body = req.body;
    let city = body[0];
    let state = body[1];
    let zip = body[2];

    sqlString = '' + 
    'SELECT Customer.firstName AS firstName, Customer.lastName AS lastName,COUNT(*) AS orderCount, Format(AVG(Review.rating), 1)  as avgRating ' +
    'FROM Customer INNER JOIN Orders ON Customer.username = orders.customerUsername INNER JOIN merchandise ON merchandise.orderID = orders.orderNum ' +
    'AND merchandise.customerUsername = orders.customerUsername INNER JOIN Store ON store.city = merchandise.shelfCity AND store.state = merchandise.shelfState AND ' +
    'store.zip = merchandise.shelfZIP LEFT OUTER JOIN review ON customer.username = review.customerUsername AND review.brandType = merchandise.brandType ' +
    'AND merchandise.modelType = review.modelType WHERE store.city = ? AND store.state = ? AND store.zip = ?;'

    connection.query(sqlString, [city, state, zip], function (error, results, fields) {
        if (error) {
            res.json({
                status: "failure",
                body: "Invalid query."
            })
        } else {
            console.log(results);
            res.json({
                status: "success",
                body: results
            })
        }
    })
})

module.exports = router;


