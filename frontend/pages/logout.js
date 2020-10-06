import React, {useEffect} from 'react';
import withApollo from '@/hoc/withApollo'
import {useRouter} from 'next/router'
import {getDataFromTree} from "@apollo/client/react/ssr";
import {useSignOut} from '../apollo/actions/index';

const Logout = ({apollo}) => {
    const [signOut] = useSignOut();
    const router = useRouter();

    useEffect(() => {
        signOut()
            .then(() => {
                apollo.resetStore()
                    .then(() => {
                        router.push('/login')
                    })
            });

    }, []);


    const errorMessage = (error) => {
        return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Oops... Something went wrong!'
    };

    return (
        <div>
            <p>Signing out...</p>
        </div>

    )
};

export default withApollo(Logout, {getDataFromTree});
