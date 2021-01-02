var express = require('express');
var router = express.Router();
const classify =require('./training/classify');
const createConn = require('./createConn');

router.use('/classify',classify);
router.use('/createConn',createConn);

module.exports = router;
