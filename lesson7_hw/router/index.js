const express = require('express');
const router = express.Router();

router.use('/tasks', require('./tasks'));
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.get('/', (req, res) => {
  res.send('todo list api');
});

module.exports = router;