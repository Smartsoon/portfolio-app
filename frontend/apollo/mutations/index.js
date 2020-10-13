import { gql } from '@apollo/client';


const portfolioMutations = {
    CREATE_PORTFOLIO: gql`
        mutation createPortfolio(
                $title: String!
                $company: String!
                $companyWebsite: String!
                $location: String!
                $jobTitle: String!
                $description: String!
                $startDate: String!
                $endDate: String
        ) {
            createPortfolio( input: {
                title: $title
                company: $company
                companyWebsite: $companyWebsite
                location: $location
                jobTitle: $jobTitle
                description: $description
                startDate: $startDate
                endDate: $endDate

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
        mutation updatePortfolio(
            $id: ID
            $title: String!
            $company: String!
            $companyWebsite: String!
            $location: String!
            $jobTitle: String!
            $description: String!
            $startDate: String!
            $endDate: String
        ) {
            updatePortfolio(id: $id, input: {
                title: $title
                company: $company
                companyWebsite: $companyWebsite
                location: $location
                jobTitle: $jobTitle
                description: $description
                startDate: $startDate
                endDate: $endDate
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
