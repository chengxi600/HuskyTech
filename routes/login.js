var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
});

module.exports = router;
