import { gql } from '@apollo/client';


const authQueries = {
    GET_AUTH_USER: gql`
        query getUser {
            user {
                _id
                username
                avatar
                email
                role
            }
        } 
    `,
};

export default authQueries;
