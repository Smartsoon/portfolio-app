import React, {useEffect} from 'react';
import withApollo from '@/hoc/withApollo'
import {useRouter} from 'next/router'
import {getDataFromTree} from "@apollo/client/react/ssr";
import {useSignOut} from '../apollo/actions/index';
import BaseLayout from "../layouts/BaseLayout";

const Logout = () => {
    const [signOut] = useSignOut();
    const router = useRouter();

    useEffect(() => {
        signOut()
            .then(() => {
                router.push('/login')
            });

    }, []);

    return (
        <BaseLayout>
            <div>

            </div>
        </BaseLayout>
    )
};

export default withApollo(Logout, {getDataFromTree});
