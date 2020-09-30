import { gql } from '@apollo/client';

const portfolioQueries = {
    GET_PORTFOLIO: gql`
        query Portfolio ($id: ID) {
            portfolio(id: $id) {
                _id
                title
                company
                companyWebsite
                location
                jobTitle
                description
                startDate
                endDate
            }
        }
    `,
    GET_PORTFOLIOS: gql`
        query Portfolios {
            portfolios {
                _id
                title
                company
                companyWebsite
                location
                jobTitle
                description
                startDate
                endDate
            }
        }
    `

};

export default portfolioQueries;
