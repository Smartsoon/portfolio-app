import React from "react";
import { useGetUser } from '../apollo/actions/index';
import Redirect from '../components/shared/redirect';


const duplicateLoginProtection = (WrappedComponent) => (props) => {
    const { data: { user } = {}, loading, error } = useGetUser({
        fetchPolicy: 'cache-first'
    });

    if (loading && !user && typeof window !== 'undefined') {
        return <div></div>
    }

    if (
        !loading && user
    ) {
        return <Redirect to="/" />
    }

    return <WrappedComponent { ...props }/>
};

export default duplicateLoginProtection;
