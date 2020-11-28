var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/u-home', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/usersHome.html'));
});

module.exports = router;
