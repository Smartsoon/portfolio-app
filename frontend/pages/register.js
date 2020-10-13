import React from 'react';
import RegisterForm from '../components/forms/registerForm';
import {Mutation} from "@apollo/client/react/components";
import withApollo from '@/hoc/withApollo'
import {getDataFromTree} from "@apollo/client/react/ssr";
import Redirect from '@/components/shared/redirect'
import authMutations from '../apollo/mutations/authentication/index';
import LoginForm from "../components/forms/loginForm";
import {useSignIn} from "../apollo/actions";
import {useMutation} from "@apollo/client";
import BaseLayout from "../layouts/baseLayout";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const {SIGN_UP} = authMutations;


const Register = () => {
    const [signUp, {data, loading, error}] = useMutation(SIGN_UP);
    const router = useRouter();
    const errorMessage = (error) => {
        return (error.graphQLErrors && <div className="d-none">{toast.error(error.graphQLErrors[0].message, {autoClose: 3000})}</div>
            ||
            <div className="d-none">{toast.error("Oops... Something went wrong!", {autoClose: 3000})}</div>
        )};

    const handleSignUp = async (registerData) => {
        try {
            await signUp({variables: registerData});
            await router.push('/login');
            toast.success('You successfully registered, please log in!', {autoClose: 3000})
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <BaseLayout>
            <div className="bwm-form mt-5 container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Register</h1>
                        <RegisterForm loading={loading} onSubmit={handleSignUp}/>
                        {error && errorMessage(error)}
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
};

export default withApollo(Register, {getDataFromTree});


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
