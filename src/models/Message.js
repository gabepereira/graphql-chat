const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: 'String',
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Message', MessageSchema, 'messages');