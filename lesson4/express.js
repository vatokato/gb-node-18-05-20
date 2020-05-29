const express = require('express');
const path = require('path');
const consolidate = require('consolidate'); // для работы с шаблонизаторами

const app = express();

// Настройка handlebars
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

//Middleware
// body-parser
// app.use('/users', express.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/styles/', express.static(path.resolve(__dirname, './assets/css')));
app.use('/fonts/', express.static(path.resolve(__dirname, './assets/fonts')));
app.use('/img/', express.static(path.resolve(__dirname, './assets/img')));
app.use((req, res, next) => {
    console.log('middleware');
    req.user = {
        name: 'Vasya',
    };
    next();
});

app.all('/', (req, res, next) => {
    console.log('all');
    next();
});
app.get('/', (req, res) => {
    console.log('qwee');
    console.log(req.user)
    // res.json({message: 'Hello World!'});
    // res.send('Hello World!');
    // res.send('<h2>Hello World!</h2>');
    res.sendFile(path.resolve(__dirname, './index.html'));
});
app.get('/user', (req, res) => {
    res.render('user', {
        fullName: 'John',
        achievements: ['Главный сторож стены', 'Winter is coming!'],
    });
});
app.get('/users/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.query)
    res.send(`It's User with id ${req.params.id}${req.query.age ? ' and age 25' : ''}`);
});
app.post('/tasks', (req, res) => {
    console.log(req.body);
    res.send('Ok!');
});

app.listen(5000, () => {
    console.log('Server has been started!');
});
