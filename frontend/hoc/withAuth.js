import React from "react";
import {useGetUser} from '../apollo/actions/index';
import Redirect from '../components/shared/redirect';
import BaseLayout from "../layouts/baseLayout";
import Spinner from "react-bootstrap/Spinner";


const withAuth = (WrappedComponent, role, options = {ssr: false}) => {
    function WithAuth(props) {
        const {data: {user} = {}, loading, error} = useGetUser({
            fetchPolicy: 'network-only'
        });


        if (
            !loading &&
            (!user || error) &&
            typeof window !== 'undefined'
        ) {
            return <Redirect to="/login" query={{message: 'NOT_AUTHORIZED'}}/>
        }

        if (user) {
            if (role && !role.includes(user.role)) {
                return <Redirect to="/" query={{message: 'ACCESS_DENIED'}}/>
            }
            return <WrappedComponent {...props} />
        }

        return (
            <BaseLayout>
                <Spinner animation="border" variant="danger" />
            </BaseLayout>
        );
    }

    if (options.ssr) {
        const serverRedirect = (res, to) => {
            res.redirect(to);
            res.end();
            return {};
        };

        WithAuth.getInitialProps = async (context) => {
            const {req, res} = context;

            if (req) {
                const {user} = req;

                if (!user) {
                    return serverRedirect(res, '/login?message=NOT_AUTHORIZED')
                }

                if (user) {
                    if (role && !role.includes(user.role)) {
                        return serverRedirect(res, '/?message=ACCESS_DENIED')
                    }
                    return serverRedirect(res, '/')
                }
            }
            const pageProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(context));
            return {...pageProps}
        }
    }

    return WithAuth;
};


export default withAuth;
