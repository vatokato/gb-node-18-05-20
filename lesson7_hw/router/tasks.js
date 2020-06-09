const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Task = require('../models/task');
const { tokenSecret } = require('../config');

router.use('/', async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'No token' });
  } else {
    const [type, token] = req.headers.authorization.split(' ');

    jwt.verify(token, tokenSecret, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: 'Wrong token' });
      }
      req.user = payload;
      next();
    });
  }
});

router.get('/', async (req, res) => {
  const { _id: userId } = req.user;
  const tasks = await Task.find({ userId });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { _id: userId } = req.user;
  console.log({ ...req.body, userId })
  const task = new Task({ ...req.body, userId });
  const savedTask = await task.save(err => {
    console.error(err);
  });
  res.json(savedTask);
});

// Полное изменение задачи
router.put('/:id', async (req, res) => {
  const savedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(savedTask);
});

// Частичное изменение задачи
router.patch('/:id', async (req, res) => {
  const savedTask = await Task.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
  res.json(savedTask);
});

router.delete('/:id', async (req, res) => {
  const deletedTask = await Task.findByIdAndRemove(req.params.id);
  res.json(deletedTask);
});

module.exports = router;