const Room = require('../models/Room');
const User = require('../models/User');

const CHAT_CHANNEL = 'CHAT_CHANNEL';

const Query = {
    messages: async(_, { room }, ctx) => {
        const _room = await Room.findById(room);
        return _room.messages;
    }
};

const Mutation = {
    sendMessage: async(_, { message, room }, ctx, info) => {
        const data = {
            message: message,
            sender: ctx.token.id
        }
        const response = await Room.findById(room);
        response.messages.push(data);
        response.updateOne(response, (err, doc) => 
        err ? new Error('Error updating room: ') : doc);
        ctx.pubsub.publish('CHAT_CHANNEL', { getMessage: message });
        return { message };
    }
};

const Subscription = {
    getMessage: {
        subscribe: (_, args, ctx, info) => {
            return ctx.pubsub.asyncIterator(CHAT_CHANNEL);
        }
    }
};

module.exports = {
	Query,
    Mutation,
    Subscription
}