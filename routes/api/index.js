const express = require('express');
const router = new express.Router();

router.use('/user/', require('./user'));
router.use('/passwords/', require('./passwords'));

module.exports = router;
