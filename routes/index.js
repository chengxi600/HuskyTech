const express = require('express');
const router = express.Router();

//for the address http://localhost:3000/
//redirects to http://localhost:3000/login
router.get('/', function(req, res, next) {
  res.redirect('/login');
});


module.exports = router;
