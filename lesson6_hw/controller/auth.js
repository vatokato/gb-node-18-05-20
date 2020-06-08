const express = require('express');
const router = express.Router();
const passport = require('../services/auth');
const User = require('../models/user');

router.get('/', async (req, res) => {
  const { user } = req;
  const error = !!req.query.error;
  res.render('auth', {error, user});
});

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save(err => console.error(err));
  res.redirect('/auth');
});

router.post('/', passport.authenticate);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth');
});

module.exports = router;