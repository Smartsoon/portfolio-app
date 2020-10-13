import React from "react";
import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import moment from 'moment';

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            request: (operationObj) => {
                operationObj.setContent({
                    fetchOptions: {
                        credentials: 'include'
                    },
                    headers
                })
            },
            uri: 'http://localhost:3000/graphql',
            cache: new InMemoryCache().restore(initialState || {})
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);
