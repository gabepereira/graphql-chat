const Message = require('../models/Message');
const User = require('../models/User');
const Room = require('../models/Room');

const Query = {
    messages: async(_, { room }, ctx) => {
        const messages = await Message.find({ room: room });
        return messages;
    }
};

const Mutation = {
    sendMessage: async(_, { message, room }, ctx, info) => {
        const user = await User.findById(ctx.token.id);
        if(!user || !room) throw new Error('No user found.');
        const response = await Message.create({
            message, room, sender: user
        });
        return response;
    }
};

module.exports = {
	Query,
    Mutation
}