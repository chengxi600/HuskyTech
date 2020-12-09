const express = require('express');
const path = require('path');
const router = express.Router();

//for the address http://localhost:3000/u-home/
//serves the user homepage
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/usersHome.html'));
});

//for the address http://localhost:3000/review
//serves a webpage to submit reviews
router.get('/review', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/review.html'));
})

module.exports = router;
