const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const { host, port, database, salt } = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.connect(`mongodb://${host}:${port}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const passport = require('./services/auth');

const usersController = require('./controllers/users');
const tasksController = require('./controllers/tasks');
const authController = require('./controllers/auth');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: salt,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
}));

app.use(passport.initialize);
app.use(passport.session);

app.get('/', async (req, res) => {
    const { user } = req;
    res.render('index', { title: 'TODO LIST', user });
});

app.use('/tasks', tasksController);
app.use('/users', usersController);
app.use('/auth', authController);

app.listen(5000, () => {
    console.log('Server has been started! http://localhost:5000');
});
