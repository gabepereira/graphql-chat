const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title: 'String',
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

module.exports = mongoose.model('Room', RoomSchema, 'rooms');