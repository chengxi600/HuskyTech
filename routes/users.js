const express = require('express');
const path = require('path');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/usersHome.html'));
});

router.get('/review', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/review.html'));
})

module.exports = router;
