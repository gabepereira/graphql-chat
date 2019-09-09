const { shield, and } = require("graphql-shield");
const policies = require('./policies');

module.exports = permissions = shield({
    Query: {
        user: and(
            policies.auth, policies.admin
        ),
        users: and(
            policies.auth, policies.admin
        ),
    },

    Mutation: {
        createUser: and(),
        deleteUser: and(
            policies.auth, policies.admin
        ),
        createRoom: and(
            policies.auth
        ),
        sendMessage: and(
            policies.auth
        ),
    }
});