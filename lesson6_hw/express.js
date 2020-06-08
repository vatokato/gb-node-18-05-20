const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const { host, port, database, salt } = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const passport = require('./services/auth');
const router = require('./controller/');

mongoose.connect(`mongodb://${host}:${port}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

app.use(router);

app.listen(5000, () => {
    console.log('Server has been started! http://localhost:5000');
});
