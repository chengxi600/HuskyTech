const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/employeeHome.html'));
});

router.get('/report', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/reportQueries.html'));
});

module.exports = router;
