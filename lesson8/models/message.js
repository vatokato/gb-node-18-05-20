const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: String ,
    text: String,
    created: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model('Message', messageSchema, 'messages');
