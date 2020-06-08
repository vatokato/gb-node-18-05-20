const express = require('express');
const router = express.Router();
const passport = require('../services/auth');

router.get('/register', async (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.redirect('/auth');
});

router.get('/', async (req, res) => {
  const error = !!req.query.error;
  res.render('auth', {error});
});

router.post('/', passport.authenticate);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth');
});

module.exports = router;