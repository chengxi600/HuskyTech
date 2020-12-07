const express = require('express');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
});


module.exports = router;
