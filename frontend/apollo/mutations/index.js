import { gql } from '@apollo/client';


const portfolioMutations = {
    CREATE_PORTFOLIO: gql`
        mutation createPortfolio {
            createPortfolio( input: {
                title: "2222"
                company: "2222"
                companyWebsite: "2222"
                location: "2222"
                jobTitle: "2222"
                description: "2222"
                startDate: "2012-12-12T23:59Z"
                endDate: "2020-12-12T23:59Z"

            }) {
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
    UPDATE_PORTFOLIO: gql`
        mutation updatePortfolio($id: ID) {
            updatePortfolio(id: $id, input: {
                title: "2222"
                company: "2222"
                description: "2222"
            }) {
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
    DELETE_PORTFOLIO: gql`
        mutation deletePortfolio($id: ID) {
            deletePortfolio(id: $id) 
        }
    `
};

export default portfolioMutations;
