const express = require('express');
const router = express.Router();
const Users = require('../models/user');

router.get('/', async (req, res) => {
  const { user } = req;
  const users = await Users.find();
  res.render('users', { title: 'Пользователи', users, user});
});

router.get('/:action/:id', async (req, res) => {
  // Delete
  if(req.params.action === 'delete') {
    await Users.deleteOne({ _id: req.params.id });
  }
  res.redirect('/users');
});

router.post('/', async (req, res) => {
  const { id } = req.body;
  // Edit
  if (id) {
    await Users.update({ _id: id }, req.body);
    res.redirect(`/users/${id}`);
  }
  // Create
  else {
    const user = new Users(req.body);
    await user.save();
    res.redirect('/users');
  }
});

router.get('/:id', async(req, res) => {
  const user = await Users.findById(req.params.id);
  res.render('user', user);
});

module.exports = router;