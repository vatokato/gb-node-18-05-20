const express = require('express');
const mongoose = require('mongoose');
const { host, port, database, salt } = require('./config');

const router = require('./router/');

mongoose.connect(`mongodb://${host}:${port}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.listen(5000, () => {
    console.log('Server has been started! http://localhost:5000');
});
