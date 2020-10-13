const GraphQLStrategy = require('./strategies');
const User = require('../../db/models/User');

exports.init = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user)
        })
    });

    passport.use('graphql', new GraphQLStrategy(({email, password}, done) => {

        // 1. Find user in DB and if it exist verify user password
        // 2. If user is verified call done function to notify our strategy
        User.findOne({email}, (err, user) => {

            // First param of done is "error", second one for user
            if (err) {
                throw err
            }
            if (!user) {
                return done(null, false)
            }

            // TODO: Check user password if its matching password from options
            user.validatePassword(password, (err, isMatching) => {
                if (err) {
                    throw err
                }
                if (!isMatching) {
                    done(null, false)
                }

                return done(null, user)
            });
        });
    }))
};
