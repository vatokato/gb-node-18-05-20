const express = require('express');
const tasks = require('./tasks');
const auth = require('./auth');
const router = express.Router();

router.use('/task', tasks);
router.use('/auth', auth);

module.exports = router;
