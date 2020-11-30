var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/html/homeLogin.html'));
});

function createRandomCookie() {
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    return randomNumber;
}

//handle login and registering 
router.post('/', function (req, res, next) {
    console.log("post request received" + req.body.username);
    if (req.body.register === true) {
        //make an api call to add to user database

        res.redirect();
        let randomCookie = createRandomCookie();
        res.cookie('account-type', "user", { maxAge: 900000, httpOnly: true });
        res.cookie("username", "", { maxAge: 900000, httpOnly: true });
        res.cookie('session', randomCookie, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    } else { // check login information

        if (req.body.username && req.body.password) {
            
            //api call to database
            res.redirect();
        } else {
            res.json({

            })
        }
    }
})

module.exports = router;
