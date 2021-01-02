const express = require('express');
const router = express.Router();
const async = require('./async');
const promise = require('./promise');
router.use('/async',async);
router.use('/promise', promise);

module.exports = router;
