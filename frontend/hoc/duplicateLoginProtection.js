import React from "react";
import { useGetUser } from '../apollo/actions/index';
import Redirect from '../components/shared/redirect';
import Spinner from "react-bootstrap/Spinner";


const duplicateLoginProtection = (WrappedComponent) => (props) => {
    const { data: { user } = {}, loading, error } = useGetUser();

    if (loading) {
        return (
                <Spinner className="spinner" size="lg" animation="border" variant="danger" />
        )
    }

    if (!user) {
        return <WrappedComponent { ...props }/>
    }

    if (user) {
        return <Redirect to="/" />
    }

    return null
};

export default duplicateLoginProtection;
