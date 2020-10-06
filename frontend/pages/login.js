import React from 'react';
import withApollo from '@/hoc/withApollo'
import { getDataFromTree } from "@apollo/client/react/ssr";
import LoginForm from "../components/forms/loginForm";
import { useSignIn } from '../apollo/actions/index';
import Redirect from '@/components/shared/redirect'

const Login = () => {

    const [ signIn, { data, loading, error } ] = useSignIn();

    const errorMessage = (error) => {
        return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Oops... Something went wrong!'
    };

    return (
        <div>
            <div className="container">
                <div className="bwm-form mt-5">
                    <div className="row">
                        <div className="col-md-5 mx-auto">
                            <h1 className="page-title">Login</h1>
                            <LoginForm loading={loading} onSubmit={(signInData) => signIn({ variables: signInData })}/>
                            { data && data.signIn && <Redirect to="/"/> }
                            { error && <div className="alert alert-danger">{errorMessage(error)}</div> }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default withApollo(Login, { getDataFromTree });
