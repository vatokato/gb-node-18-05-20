const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const mustBeAuthenticated = require('../helpers/must-be-auth');

router.use('/', mustBeAuthenticated);

router.get('/', async (req, res) => {
  const { user } = req;
  const tasks = await Task.find().lean().sort({ createdAt: 'desc' }); // фикс новых версий
  res.render('tasks', {tasks, user});
});

router.post('/', async (req, res) => {
  const { id, completed, deleting } = req.body;
  if (id && deleting) {
    await Task.deleteOne({_id: id});
  } else if (id) {
    await Task.updateOne({_id: id}, {$set: { completed: Boolean(completed) }});
  } else {
    const task = new Task(req.body);
    await task.save();
  }
  res.redirect('/tasks');
});

module.exports = router;