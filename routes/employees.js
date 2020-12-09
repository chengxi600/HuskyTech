const express = require('express');
const path = require('path');
const router = express.Router();

//for the address http://localhost:3000/e-home/
//serves the employee home page
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/employeeHome.html'));
});

//for the address http://localhost:3000/e-home/report
//serves the reportQuery web page
router.get('/report', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/reportQueries.html'));
});

module.exports = router;
