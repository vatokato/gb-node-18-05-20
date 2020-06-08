const express = require('express');
const router = express.Router();

router.use('/tasks', require('./tasks'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.get('/', async (req, res) => {
  const { user } = req;
  res.render('index', { title: 'TODO LIST', user });
});

module.exports = router;