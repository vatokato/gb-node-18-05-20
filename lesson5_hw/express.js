const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const { host, port, database } = require('./config');

mongoose.connect(`mongodb://${host}:${port}/${database}`, { // /dbName
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const User = require('./models/user');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', async (req, res) => {
    res.render('index', { title: 'TODO LIST'});
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.render('users', { title: 'Пользователи', users});
});

app.get('/users/:action/:id', async (req, res) => {
    // Delete
    if(req.params.action === 'delete') {
        await User.deleteOne({ _id: req.params.id });
    }
    res.redirect('/users');
});

app.post('/users', async(req, res) => {
    const { id } = req.body;
    // Edit
    if (id) {
        await User.update({ _id: id }, req.body);
        res.redirect(`/user/${id}`);
    }
    // Create
    else {
        const user = new User(req.body);
        await user.save();
        res.redirect('/users');
    }
});

app.get('/user/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.render('user', user);
});

app.listen(5000, () => {
    console.log('Server has been started!');
});
