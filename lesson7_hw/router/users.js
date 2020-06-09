const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save(err => {
    console.error(err);
  });
  res.json(savedUser);
});

module.exports = router;
