const express = require('express');
const next = require('next');
const {ApolloServer, gql} = require('apollo-server-express');
const mongoose = require('mongoose');

const {portfolioMutations, portfolioQueries} = require('./graphql/resolvers/index');
const {portfolioTypes} = require('./graphql/types/index');

//GQL Models
const Portfolio = require('./graphql/models/Portfolio');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

require('./db').dbConnect();

app.prepare().then(() => {
    const server = express();

    const typeDefs = gql`
        ${portfolioTypes}
    `;

    const resolvers = {
        Query: {
            ...portfolioQueries
        },
        Mutation: {
            ...portfolioMutations
        },
    };

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {
            return ({
                models: {
                    Portfolio: new Portfolio(mongoose.model('Portfolio'))
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
