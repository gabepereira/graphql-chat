const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: 'String',
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    }
});

module.exports = mongoose.model('Message', MessageSchema, 'messages');