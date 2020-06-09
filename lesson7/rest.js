/*
GET - Read
POST - Create
PUT - Update (full)
PATCH - Update (partial)
DELETE - Delete

CRUD
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = require('./router');

mongoose.connect('mongodb://localhost:32768/insta', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(cors());
app.use(express.json());

const Task = require('./models/task');
const User = require('./models/user');

app.use('/task', async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json({ message: 'No token' });
    } else {
        const [type, token] = req.headers.authorization.split(' ');

        jwt.verify(token, 'secret-user-token', (err, payload) => {
            if (err) {
                return res.json({ message: 'Wrong token' });
            }

            req.user = payload;

            next();
        });
    }
});

app.use(router);

app.listen(8888);
/* extra ssl
const https = require('https');

https.createServer({
    key: fs.readFileSync('server.key'), // путь к ключу
    cert: fs.readFileSync('server.crt'), // путь к сертификату
}, app);
app - express application
 */
