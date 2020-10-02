const { Strategy } = require('passport-strategy');

// Strategy get options (email, pass) needed to authenticate user
// Strategy gets a callback function that will contain functionality to verify an user
// Strategy as to have "authenticate" function
// Strategy has access to "error", "fail" and "success" functions
class GraphQLStrategy extends Strategy {

    constructor(verify) {
        super();
        if (!verify) {
            throw new Error('GraphQL strategy requires a verify callback')
        }
        this.verify =verify;
        this.name = 'graphql'
    }

    authenticate(_, options) {
        // in done we receive "error" "user" "info"
        const done = (error, user) => {
            // if user then call "success" otherwise call "fail" of "error"
            if (error) {
                return this.error
            }
            if (!user) {
                return this.fail(401)
            }

            return this.success(user)
        };
        this.verify(options, done)
    }
}

module.exports = GraphQLStrategy;
