const {gql} = require('apollo-server-express');

module.exports.portfolioTypes = gql`
    type Portfolio {
        _id: ID
        title: String
        company: String
        companyWebsite: String
        location: String
        jobTitle: String
        description: String
        startDate: String
        endDate: String
    }

    input PortfolioInput {
        title: String
        company: String
        companyWebsite: String
        location: String
        jobTitle: String
        description: String
        startDate: String
        endDate: String
    }

    type Query {
        portfolio(id: ID): Portfolio
        portfolios: [Portfolio]
    }

    type Mutation {
        createPortfolio(input: PortfolioInput): Portfolio
        updatePortfolio(id: ID, input: PortfolioInput): Portfolio
        deletePortfolio(id: ID): ID

        signUp(input: signUpInput): String
        signIn(input: signInInput): User
        signOut: Boolean
    }
`;

exports.userTypes = gql`
    type User {
        _id: ID
        avatar: String
        email: String!
        name: String
        username: String!
        password: String!
        role: String
        info: String
        createdAt: String
    }
    
    input signUpInput {
        avatar: String
        email: String!
        name: String
        username: String!
        password: String!
        passwordConfirmation: String!
        role: String
        info: String
        createdAt: String
    }
    
    input signInInput {
        email: String!
        password: String!
    }
`;
