const express = require('express');
const path = require('path');
const consolidate = require('consolidate'); // для работы с шаблонизаторами
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:32768/insta', { // /dbName
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const User = require('./models/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});
app.get('/users/:id', async(req, res) => {
    const users = await User.findById(req.params.id);
    res.json(users);
});
app.post('/users', async(req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
});

app.listen(5000, () => {
    console.log('Server has been started!');
});
