import { gql } from '@apollo/client';


const authMutations = {
    SIGN_UP: gql`
        mutation SignUp(
            $avatar: String
            $username: String!
            $email: String!
            $password: String!
            $passwordConfirmation: String!
        ) {
            signUp(input: {
                avatar: $avatar
                username: $username
                email: $email
                password: $password
                passwordConfirmation: $passwordConfirmation
            })
        }
    `,

    SIGN_IN: gql`
        mutation SignIn(
            $email: String!
            $password: String!
        ) {
            signIn(input: {
                email: $email
                password: $password
            }) {
                _id
                username
                role
                avatar
            }
        }
    `,

    SIGN_OUT: gql`
        mutation SignOut {
            signOut
        }
    `
};

export default authMutations;
