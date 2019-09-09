const { GraphQLServer } = require('graphql-yoga');
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

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [middlewares.Permissions],
  context: req => ({
    ...req,
    token: middlewares.token(req)
  })
});

server.start(options, () => console.log(
  `Server is running on http://localhost:${options.port}`
)).catch(err => console.error('Connection error: ', err));