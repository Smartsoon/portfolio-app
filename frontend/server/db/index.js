const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const config = require('../config/dev');
require('./models/portfolio');
require('./models/User');
require('./models/forumCategory');
require('./models/forumTopics');
require('./models/post');

exports.dbConnect = () => {
    mongoose.connect(config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, () => {
        console.log('Connected to database!')
    })
};

exports.initSessionStore = () => {
    const store = new MongoDbStore({
        uri: config.DB_URI,
        collection: 'portfolioSessions'
    });
    return store
};
