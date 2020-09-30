const {gql } = require('apollo-server-express');

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
            hello: String
            portfolio(id: ID): Portfolio
            portfolios: [Portfolio]
        }
        
    type Mutation {
            createPortfolio(input: PortfolioInput): Portfolio
            updatePortfolio(id: ID, input: PortfolioInput): Portfolio
            deletePortfolio(id: ID): ID
        }
`;
