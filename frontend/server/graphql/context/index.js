const passport = require('passport');

// email and password = options arg
const authenticateUser = (req, options) => {
    return new Promise((res, rej) => {
        // Here we will get user if it authenticated
        const done = (err, user) => {
            if (err) {
                rej(err)
            }
            // If we will get user here we can save session to db
            if (user) {
                req.login(user, (err) => {
                    if (err) {
                        return rej(new Error(err))
                    }
                    res(user)
                });
            } else {
                return rej(new Error('Invalid password or email'))
            }
        };

        const authFn = passport.authenticate('graphql', options, done);
        authFn();
    });
};



exports.buildAuthContext = (req) => {
    const auth = {
        authenticate: (options) => {
            return authenticateUser(req, options)
        },
        logout: () => req.logout(),
        isAuthenticated: () => req.isAuthenticated(),
        getUser: () => req.user
    };

    return auth
};
