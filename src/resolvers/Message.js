const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');

const Query = {
    
};

const Mutation = {
    sendMessage: (_, { text, room }, ctx, info) => {
        const message = Message.create({
            message: text,
            sender: ctx.token.id,
            room: room
        });
        return message ? message : new Error('Failed to send message.');
    }
};

module.exports = {
	Query,
	Mutation
}