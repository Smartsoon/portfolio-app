import React from "react";
import { useGetUser } from '../apollo/actions/index'
import Redirect from '../components/shared/redirect'

const withAuth = (WrappedComponent, role) => (props) => {
    const { data: { user } = {}, loading, error } = useGetUser({
        fetchPolicy: 'network-only'
    });

    if (
        !loading &&
        (!user || error) &&
        typeof window !== 'undefined'
    ) {
        return <Redirect to="/login" />
    }

    if (user) {
        if (role && user.role !== role) {
            return <Redirect to="/login" />
        }
        return <WrappedComponent {...props} />
    }

    return 'Authenticating...'
};

export default withAuth;

