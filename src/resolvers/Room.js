const Room = require('../models/Room');
const User = require('../models/User');

const Query = {
    rooms: () => Room.find(),
};

const Mutation = {
    createRoom: async(_, { title }, ctx, info) => {
        const user = await User.findById(ctx.token.id);
        if (!user) throw new Error('No user found.');
        const room = await Room.create({
            title: title,
            users: [user],
        });
        user.rooms.push(room.id);
        user.updateOne(user, (err, doc) => 
        err ? new Error('Error updating user: ') : doc);
        return room ? room : new Error('Failed to create room.');
    },
    joinRoom: async(_, { room }, ctx, info) => {
        const user = await User.findById(ctx.token.id);
        const _room = await Room.findById(room);
        if (!_room) throw new Error('No room found.');
        user.rooms.push(_room.id);
        user.updateOne(user, (err, doc) => 
        err ? new Error('Error updating user: ') : doc);
        return _room ? _room : new Error('Failed to join room.');
    }
};

module.exports = {
	Query,
	Mutation
}