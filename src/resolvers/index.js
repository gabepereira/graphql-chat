const user = require('./User');

const Query = Object.assign(
	user.Query,
);

const Mutation = Object.assign(
	user.Mutation,
);

module.exports = {
  Query,
  Mutation
}