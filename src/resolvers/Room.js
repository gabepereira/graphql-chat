const Room = require('../models/Room');
const User = require('../models/User');

const Query = {
    
};

const Mutation = {
    createRoom: async(_, { title }, ctx, info) => {
        const user = await User.findById(ctx.token.id);
        if (!user) throw new Error('No user found.');
        const room = await Room.create({
            title: title,
            users: [user],
            messages: []
        });
        user.rooms.push(room.id);
        user.updateOne(user, (err, doc) => 
        err ? new Error('Error updating user: ') : doc);
        return room ? room : new Error('Failed to create room.');
    },
    // joinRoom: () => {

    // }
};

module.exports = {
	Query,
	Mutation
}