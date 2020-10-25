import {useLazyQuery, useMutation, useQuery} from "@apollo/client";

import portfolioQueries from '@/apollo/queries/index';
const { GET_PORTFOLIOS, GET_USER_PORTFOLIOS, GET_PORTFOLIO_BY_ID } = portfolioQueries;

import authQueries from '@/apollo/queries/authQueries/index';
const { GET_AUTH_USER } = authQueries;

import forumQueries from "@/apollo/queries/forum/index";
const { GET_FORUM_CATEGORIES, GET_TOPICS_BY_CATEGORY, GET_TOPIC_BY_SLUG, GET_POSTS_BY_TOPIC } = forumQueries;

import forumMutations from "@/apollo/mutations/forum/index";
const { CREATE_TOPIC, CREATE_POST } = forumMutations;

import portfolioMutations from '@/apollo/mutations/index';
const { CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO } = portfolioMutations;


import authMutations from '../../apollo/mutations/authentication/index';

const { SIGN_IN, SIGN_OUT } = authMutations;

//AUTH
export const useSignIn = () => useMutation(SIGN_IN, {
    update(cache, { data: { signIn } }) {
        try {
            cache.writeQuery({
                query: GET_AUTH_USER,
                data: { user: signIn }
            })
        } catch (e) {
            console.log(e)
        }

    }
});

export const useLazyGetUser = () => useLazyQuery(GET_AUTH_USER);

export const useSignOut =() => useMutation(SIGN_OUT, {
    update(cache, { data: { signOut } }) {
        try {
            cache.reset()
        } catch (e) {
            console.log(e)
        }
    }
});

export const useGetUser = () => useQuery(GET_AUTH_USER);
//AUTH END

//PORTFOLIO
export const useGetPortfolio = () => useQuery(GET_PORTFOLIOS);

export const useGetPortfolioById = (options) => useQuery(GET_PORTFOLIO_BY_ID, options);

export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);

export const useCreatePortfolio = () => useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
        try {
            const { portfolios } = cache.readQuery({query: GET_PORTFOLIOS});
            const { userPortfolios } = cache.readQuery({query: GET_USER_PORTFOLIOS});
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: [...portfolios, createPortfolio] }
            });
            cache.writeQuery({
                query: GET_USER_PORTFOLIOS,
                data: { userPortfolios: [...userPortfolios, createPortfolio] }
            })
        } catch (e) {
            console.log(e);
        }
    }
});

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);

export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
        const { portfolios } = cache.readQuery({query: GET_PORTFOLIOS});
        const { userPortfolios } = cache.readQuery({query: GET_USER_PORTFOLIOS});

        const newPortfolios = portfolios.filter(portfolio => portfolio._id !== deletePortfolio);
        const newUserPortfolios = userPortfolios.filter(userPortfolio => userPortfolio._id !== deletePortfolio);

        cache.writeQuery({
            query: GET_PORTFOLIOS,
            data: { portfolios: newPortfolios }
        });

        cache.writeQuery({
            query: GET_USER_PORTFOLIOS,
            data: { userPortfolios: newUserPortfolios }
        });
    }
});
//PORTFOLIO END

//FORUM
export const useGetForumCategories = () => useQuery(GET_FORUM_CATEGORIES);

export const useGetForumTopicsByCategory = (options) => useQuery(GET_TOPICS_BY_CATEGORY, options);

export const useGetTopicBySlug = (options) => useQuery(GET_TOPIC_BY_SLUG, options);

export const useGetPostsByTopic = (options) => useQuery(GET_POSTS_BY_TOPIC, options);

export const useCreateTopic = () => useMutation(CREATE_TOPIC, {
    update(cache, {data: {createTopic}}) {
        try {
            const {topicsByCategory} = cache.readQuery({query: GET_TOPICS_BY_CATEGORY, variables: {category: createTopic.forumCategory.slug}});
            cache.writeQuery({
                query: GET_TOPICS_BY_CATEGORY,
                data: {topicsByCategory: [...topicsByCategory, createTopic]},
                variables: {
                    category: createTopic.forumCategory.slug
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
});

export const useCreatePost = () => useMutation(CREATE_POST);



// , {
//     async update(cache, {data: {createPost}}) {
//         try {
//             debugger
//             await Object.keys(cache.data.data).forEach(key => {
//                 debugger
//                 key.match(/^Post/) && cache.data.delete(key);
//             });
//
//         } catch(e) {}
//     }
// }


// export const useCreatePost = () => useMutation(CREATE_POST, {
//     update(cache, {data: {createPost}}) {
//         try {
//             const {postsByTopic} = cache.readQuery({query: GET_POSTS_BY_TOPIC, variables: {slug: createPost.topic.slug}});
//             cache.writeQuery({
//                 query: GET_POSTS_BY_TOPIC,
//                 data: {postsByTopic: [...postsByTopic, createPost]},
//                 variables: {
//                     slug: createPost.topic.slug
//                 }
//             })
//         } catch (e) {
//             console.log(e);
//         }
//     }
//     });

//FORUM END

