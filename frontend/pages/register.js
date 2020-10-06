import React from 'react';
import RegisterForm from '../components/forms/registerForm';
import {Mutation} from "@apollo/client/react/components";
import withApollo from '@/hoc/withApollo'
import { getDataFromTree } from "@apollo/client/react/ssr";
import Redirect from '@/components/shared/redirect'
import authMutations from '../apollo/mutations/authentication/index';
import LoginForm from "../components/forms/loginForm";
import {useSignIn} from "../apollo/actions";
import {useMutation} from "@apollo/client";
const {SIGN_UP} = authMutations;


const Register = () => {
    const [ signUp, { data, loading, error } ] = useMutation(SIGN_UP, {
        errorPolicy: "all"
    });

    const errorMessage = (error) => {
        return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Oops... Something went wrong!'
    };

    return (
        <div className="bwm-form mt-5 container">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <h1 className="page-title">Register</h1>
                    <RegisterForm loading={loading} onSubmit={(registerData) => signUp({ variables: registerData })}/>
                    { data && data.signUp && <Redirect to="/login"/> }
                    { error && <div className="alert alert-danger mt-2">{errorMessage(error)}</div> }
                </div>
            </div>
        </div>
    )
};

export default withApollo(Register, { getDataFromTree });


/*<Mutation mutation={SIGN_UP}>*/
/*    {*/
/*        (signUpUser, {data, error}) =>*/
/*            <>*/
/*                <RegisterForm onSubmit={registerData => {*/
/*                    signUpUser({variables: registerData})*/
/*                }}/>*/
/*                { data && data.signUp && <Redirect to="/login"/> }*/
/*                { error && <div className="alert alert-danger">{errorMessage(error)}</div> }*/
/*            </>*/
/*    }*/
/*</Mutation>*/
