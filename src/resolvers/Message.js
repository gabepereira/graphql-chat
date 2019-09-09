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
        const response = await Room.findById(room);
        response.messages.push({
            message: message,
            sender: ctx.token.id
        });
        response.updateOne(response, (err, doc) => 
        err ? new Error('Error updating room: ') : doc);
        const result = {
            message: message,
            sender: await User.findById(ctx.token.id)
        }
        ctx.pubsub.publish('CHAT_CHANNEL', {
            getMessage: result
        });
        return result;
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