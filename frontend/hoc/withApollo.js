// import React from "react";
// import withApollo from 'next-with-apollo';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
//
// export default withApollo(
//     ({ initialState }) => {
//         return new ApolloClient({
//             request: (operationObj) => {
//                 operationObj.setContent({
//                     fetchOptions: {
//                         credentials: 'include'
//                     },
//                     headers
//                 })
//             },
//             uri: 'http://localhost:3000/graphql',
//             cache: new InMemoryCache().restore(initialState || {})
//         });
//     },
//     {
//         render: ({ Page, props }) => {
//             return (
//                 <ApolloProvider client={props.apollo}>
//                     <Page {...props} />
//                 </ApolloProvider>
//             );
//         }
//     }
// );



import React from "react";
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';
import {useGetPortfolio} from "../apollo/actions";

let globalApolloClient;

function initApolloClient(initialState) {
    if (!globalApolloClient) {
        globalApolloClient = new ApolloClient({
            link: new HttpLink({
                    uri: "http://localhost:3000/graphql",
                    fetch
                }),
            request: (operationObj) => {
                operationObj.setContent({
                    fetchOptions: {
                        credentials: 'include'
                    },
                    headers
                })
            },
            cache: new InMemoryCache().restore(initialState || {})
        });
    }
    // client side page transition to an SSG page => update Apollo cache
    else if (initialState) {
        globalApolloClient.cache.restore({
            ...globalApolloClient.cache.extract(),
            ...initialState
        });
    }
    return globalApolloClient;
}

export default function withApollo(PageComponent) {
    const WithApollo = ({
                            apolloStaticCache,
                            ...pageProps
                        }) => {
// HERE WE USE THE PASSED CACHE
        const client = initApolloClient(apolloStaticCache);
// and here we have the initialized client 🙂
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        );
    };
// if you also use it for SSR
    if (PageComponent.getInitialProps) {
        WithApollo.getInitialProps = async (ctx) => {
            // Run wrapped getInitialProps methods
            let pageProps = {};
            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(ctx);
            }
            return pageProps;
        };
    }

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== "production") {
        const displayName =
            PageComponent.displayName || PageComponent.name || "Component";

        WithApollo.displayName = `withApollo(${displayName})`;
    }
    return WithApollo;
}
