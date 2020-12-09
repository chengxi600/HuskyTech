const express = require('express');
const path = require('path');
const router = express.Router();

//for the address http://localhost:3000/login/
//serves the login homepage
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
});


module.exports = router;
