var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cuddles and Curiosities' });
});

module.exports = router;
// Title/Home page 
