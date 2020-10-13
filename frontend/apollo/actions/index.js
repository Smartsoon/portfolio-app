import {useLazyQuery, useMutation, useQuery} from "@apollo/client";

import portfolioQueries from '@/apollo/queries/index';
const { GET_PORTFOLIOS, GET_USER_PORTFOLIOS, GET_PORTFOLIO_BY_ID } = portfolioQueries;
import authQueries from '@/apollo/queries/authQueries/index';
const { GET_AUTH_USER } = authQueries;
import portfolioMutations from '@/apollo/mutations/index';
const { CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO } = portfolioMutations;

import authMutations from '../../apollo/mutations/authentication/index';
const { SIGN_IN, SIGN_OUT } = authMutations;

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

// Auth

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

export const useSignOut =() => useMutation(SIGN_OUT);

export const useGetUser = () => useQuery(GET_AUTH_USER);
