const express = require('express');
const next = require('next');
const {ApolloServer, gql} = require('apollo-server-express');
const mongoose = require('mongoose');

const {portfolioMutations, portfolioQueries, userMutations, authQueries, forumQueries, forumMutations} = require('./graphql/resolvers/index');
const {portfolioTypes, userTypes, forumTypes} = require('./graphql/types/index');
const {buildAuthContext} = require('./graphql/context/index');

//GQL Models
const Portfolio = require('./graphql/models/Portfolio');
const User = require('./graphql/models/User');
const ForumTopic = require('./graphql/models/ForumTopic');
const ForumCategory = require('./graphql/models/ForumCategory');
const Post = require('./graphql/models/Post');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const db = require('./db/index');
db.dbConnect();

app.prepare().then(() => {
    const server = express();

    require('./middlewares/index').init(server, db);

    const typeDefs = gql`
        ${portfolioTypes}
        ${userTypes}
        ${forumTypes}
    `;

    const resolvers = {
        Query: {
            ...portfolioQueries,
            ...authQueries,
            ...forumQueries
        },
        Mutation: {
            ...portfolioMutations,
            ...userMutations,
            ...forumMutations
        },
    };

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => {
            return ({
                ...buildAuthContext(req),
                models: {
                    Portfolio: new Portfolio(mongoose.model('Portfolio'), req.user),
                    User: new User(mongoose.model('User')),
                    ForumTopic: new ForumTopic(mongoose.model('ForumTopic'), req.user),
                    ForumCategory: new ForumCategory(mongoose.model('ForumCategory')),
                    Post: new Post(mongoose.model('Post'), req.user),
                }
            })
        }
    });

    apolloServer.applyMiddleware({app: server});

    server.all('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`)
    })
});
