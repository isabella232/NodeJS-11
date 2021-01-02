var express = require('express');
var router = express.Router();
const homework = require('./homework/index');
const echo = require('./homework/echo/index')
const flowcontrol = require('./flowcontrol/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/homework', homework);
router.use('/homework/echo',echo);
router.use('/flowcontrol', flowcontrol);

module.exports = router;
