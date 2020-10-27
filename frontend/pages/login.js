import React from 'react';
import withApollo from '@/hoc/withApollo'
import LoginForm from "../components/forms/loginForm";
import {useSignIn} from '../apollo/actions/index';
import BaseLayout from "../layouts/BaseLayout";
import duplicateLoginProtection from "../hoc/duplicateLoginProtection";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const Login = () => {
    const [signIn, {data, loading, error}] = useSignIn();
    const router = useRouter();

    const errorMessage = (error) => {
        return (error.graphQLErrors && <div className="d-none">{toast.error(error.graphQLErrors[0].message, {autoClose: 3000})}</div>
            ||
            <div className="d-none">{toast.error("Oops... Something went wrong!", {autoClose: 3000})}</div>
        )};

    const handleSignIn = async (signInData) => {
        try {
            await signIn({variables: signInData});
            await router.push('/');
            toast.success('You successfully logged in!', {autoClose: 3000})
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <BaseLayout>
            <div>
                <div className="container">
                    <div className="bwm-form mt-5">
                        <div className="row">
                            <div className="col-md-5 mx-auto">
                                <h1 className="page-title">Login</h1>
                                <LoginForm loading={loading}
                                           onSubmit={handleSignIn}/>
                                {error && errorMessage(error)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
};

export default withApollo(duplicateLoginProtection(Login));
