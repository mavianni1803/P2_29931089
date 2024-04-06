var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Programación 2',
    name: 'Reimavi Herrera.',
    dni: '29.931.089.',
    section: '2',
   });
});

module.exports = router;
