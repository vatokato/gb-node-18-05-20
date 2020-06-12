const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');

const Message = require('./models/message');
const messageRouter = require('./router/message');

mongoose.connect('mongodb://localhost:32770/insta', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
const server = http.Server(app);
const io = SocketIO(server);

app.use('/messages', messageRouter);
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'socket.html'));
});

io.on('connection', (socket) => {
    console.log('someone has connected', socket.id);

    socket.on('join', (roomName) => {
        console.log(roomName);
        socket.join(roomName);
    });

    socket.on('message', async (body) => {
        // console.log(body);
        const message = new Message(body);
        const savedMessage = await message.save();

        if (body.to) {
            socket.in(body.to).emit('message', savedMessage);
        } else {
            socket.broadcast.emit('message', savedMessage);
            socket.emit('message', savedMessage);
        }
    });

    socket.on('disconnect', () => {
        console.log('someone has disconnected');
    })
});
// Name spacing
const nsPrivate = io.of('/private');
nsPrivate.on('connection', (socket) => {
    console.log('someone has connected to private channel')
});

server.listen(8888, () => {
    console.log('Server has been started!');
});
