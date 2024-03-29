const { GraphQLServer, PubSub } = require('graphql-yoga');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const middlewares = require('./middlewares');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const options = {
  port: process.env.PORT || '4000'
};

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [middlewares.Permissions],
  context: req => ({
    ...req,
    token: middlewares.token(req),
    pubsub,
  }),
});

server.start(options, () => console.log(
  `Server is running on localhost:${options.port}`
)).catch(err => console.error(err));