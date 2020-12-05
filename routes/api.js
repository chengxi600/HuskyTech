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
                let sqlString;
                bcrypt.genSalt(saltRounds, function (err, salt) { //generate salt and hash
                    bcrypt.hash(password, salt, function (err, hash) {
                        // Store hash into database
                        connection.query('INSERT INTO Customer (firstName, lastName, userName, passKey, salt) VALUES ' +
                            '(?, ?, ?, ?, ?);', [firstName, lastName, username, hash, salt], function (error, results, fields) {
                                if (error) {
                                    console.log("2" + error);
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
            console.log(userArr);
            if (userArr.includes(username)) { //if in usernames of customers
                connection.query('SELECT Customer.passkey FROM Customer ' +
                    'WHERE Customer.username = ' + connection.escape(username), function (error, results, fields) {
                        let myhash = results[0].password;
                        bcrypt.compare(password, myhash, function (err, result) {
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
                        console.log(returnArr);
                        if (employeeArr.includes(username)) {
                            connection.query('SELECT Employee.password FROM Employee ' +
                                'WHERE Employee.username = ' + connection.escape(username), function (error, results, fields) {
                                    let myhash = results[0].password;
                                    bcrypt.compare(password, myhash, function (err, result) {
                                        if (result) {
                                            res.json({
                                                status: 'success',
                                                body: "http://localhost:3000/e-home"
                                            })
                                        } else {
                                            res.json({
                                                status: 'failure',
                                                body: "Invalid username and/or password. Try again."
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

//task queries entry point for employees
router.post('/employee', function (req, res, next) {
    let request = req.body.taskQueryNum;
    switch (request) {
        case 1:
            break;
        case 2:
            break;
        default:
            res.json({
                status: "failure",
                body: "Invalid query."
            })
    }
    connection.query('SELECT FROM EMPLOYEE', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
});

router.post('/search-bar', function (req, res, next) {
    let body = req.body;
    let city = body[0];
    let state = body[1];
    let zip = body[2];
    let sortBy = body[3];
    let filter = body[4];

    finalList = [];

    if (sortBy === "Descending") {
        sortBy = "MerchandiseType.price DESC";
    } else {
        sortBy = "MerchandiseType.price";
    };

    if (filter.length === 0) {
        connection.query('SELECT DISTINCT MerchandiseType.brand, MerchandiseType.model, MerchandiseType.price, t1.Count' +
            'FROM Merchandise ' +
            'INNER JOIN Store ON (Store.City = Merchandise.shelfCity AND Store.State = Merchandise.shelfState AND Store.Zip = Merchandise.shelfZip) ' +
            'INNER JOIN MerchandiseType ON (MerchandiseType.brand = Merchandise.brandType AND MerchandiseType.model = Merchandise.modelType) ' +
            'INNER JOIN (SELECT COUNT(*) as Count FROM Merchandise GROUP BY MerchandiseType.brand, MerchandiseType.model) as t1 ON ' +
            'WHERE Store.City = ? AND Store.State = ? AND Store.Zip = ? ' +
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
                    returnArr.push(obj);
                })
                res.json({
                    status: 'success',
                    body: returnArr
                });
            });
    } else {
        filter.forEach(merchType => {
            connection.query('SELECT merchandiseType.brand, merchandiseType.model, merchandiseType.price ' +
                'FROM Merchandise ' +
                'INNER JOIN Store ON (Store.City = Merchandise.shelfCity AND Store.State = Merchandise.shelfState AND Store.Zip = Merchandise.shelfZip) ' +
                'INNER JOIN merchandiseType ON (MerchandiseType.brand = Merchandise.brandType AND MerchandiseType.model = Merchandise.modelType) ' +
                'INNER JOIN ? ON (' + connection.escapeId(merchType + ".brand", true) + ' = merchandiseType.brand AND ' +
                connection.escapeId(merchType + ".model", true) + ' = merchandise.model) ' +
                'WHERE Store.City = ? AND Store.State = ? AND Store.Zip = ? ' +
                'ORDER BY ' + sortBy, [merchType, city, state, zip], function (error, results, fields) {
                    if (error) {
                        res.json({
                            status: 'failure',
                            body: 'Invalid query. Try again.'
                        })
                        res.end();
                    } else {
                        let returnArr = [];
                        results.forEach(element => {
                            let obj = {};
                            for (const key in element) {
                                obj[key] = element[key];
                            }
                            returnArr.push(obj);
                        })
                        finalList.concat(returnArr);
                    }
                });
        })
        res.json({
            status: 'success',
            body: finalList
        })
        res.end();
    }
})


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
                console.log(results[0]);
                res.json({
                    status: "success",
                    body: results[0]
                })
            }
        })
})

module.exports = router;
