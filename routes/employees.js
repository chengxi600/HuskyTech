var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/e-home', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/employeeHome.html'));
});

module.exports = router;
