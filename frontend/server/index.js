const express = require('express');
const next = require('next');
const { ApolloServer, gql } = require('apollo-server-express');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const { portfolioMutations, portfolioQueries } = require('./graphql/resolvers/index');
const { portfolioTypes } = require('./graphql/types/index');

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
    });

    apolloServer.applyMiddleware({app: server});

    server.all('*', (req, res) => {
        debugger
        return handle(req, res)
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`)
    })
});
