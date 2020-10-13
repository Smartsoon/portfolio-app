const express = require('express');
const next = require('next');
const {ApolloServer, gql} = require('apollo-server-express');
const mongoose = require('mongoose');

const {portfolioMutations, portfolioQueries, userMutations, authQueries} = require('./graphql/resolvers/index');
const {portfolioTypes, userTypes} = require('./graphql/types/index');
const { buildAuthContext } = require('./graphql/context/index');

//GQL Models
const Portfolio = require('./graphql/models/Portfolio');
const User = require('./graphql/models/User');

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
        ${portfolioTypes},
        ${userTypes}
    `;

    const resolvers = {
        Query: {
            ...portfolioQueries,
            ...authQueries
        },
        Mutation: {
            ...portfolioMutations,
            ...userMutations
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
                    User: new User(mongoose.model('User'))
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
