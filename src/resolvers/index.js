const user = require('./User');
const room = require('./Room');
const message = require('./Message');

const Query = Object.assign(
  user.Query,
  room.Query,
  message.Query
);

const Mutation = Object.assign(
  user.Mutation,
  room.Mutation,
  message.Mutation
);

const Subscription = Object.assign(
  message.Subscription
)

module.exports = {
  Query,
  Mutation,
  Subscription
}