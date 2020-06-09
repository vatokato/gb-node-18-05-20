const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pick = require('lodash/pick');
const { tokenSecret } = require('../config');

const Auth = require('../models/user');

// Авторизация по токену
router.post('/', async (req, res) => { // localhost/auth
  const { username, password } = req.body;
  const user = await Auth.findOne({username});

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  if (!user.comparePassword(password)) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  res.json({
    token: jwt.sign(pick(user, ['_id', 'username']), tokenSecret),
  });
});

module.exports = router;
