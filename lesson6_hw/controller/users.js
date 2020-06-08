const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  const { user } = req;
  const users = await User.find();
  res.render('users', { title: 'Пользователи', users, user});
});

router.get('/:action/:id', async (req, res) => {
  // Delete
  if(req.params.action === 'delete') {
    await User.deleteOne({ _id: req.params.id });
  }
  res.redirect('/users');
});

router.post('/', async (req, res) => {
  const { id } = req.body;
  // Edit
  if (id) {
    await User.update({ _id: id }, req.body);
    res.redirect(`/users/${id}`);
  }
  // Create
  else {
    const user = new User(req.body);
    await user.save((err) => {
      console.log(err);
    });
    res.redirect('/users');
  }
  res.redirect('/users');
});

router.get('/:id', async(req, res) => {
  const user = await User.findById(req.params.id);
  res.render('user', user);
});

module.exports = router;