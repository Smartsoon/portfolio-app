import {useLazyQuery, useMutation, useQuery} from "@apollo/client";

import portfolioQueries from '@/apollo/queries/index';
const { GET_PORTFOLIOS } = portfolioQueries;
import authQueries from '@/apollo/queries/authQueries/index';
const { GET_AUTH_USER } = authQueries;
import portfolioMutations from '@/apollo/mutations/index';
const { CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO } = portfolioMutations;

import authMutations from '../../apollo/mutations/authentication/index';
const { SIGN_IN, SIGN_OUT } = authMutations;

export const useGetPortfolio = () => useQuery(GET_PORTFOLIOS);

export const useCreatePortfolio = () => useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
        const { portfolios } = cache.readQuery({query: GET_PORTFOLIOS});
        cache.writeQuery({
            query: GET_PORTFOLIOS,
            data: { portfolios: [...portfolios, createPortfolio] }
        })
    }
});

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);

export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
        const { portfolios } = cache.readQuery({query: GET_PORTFOLIOS});
        const newPortfolios = portfolios.filter(portfolio => portfolio._id !== deletePortfolio);
        cache.writeQuery({
            query: GET_PORTFOLIOS,
            data: { portfolios: newPortfolios }
        });
    }
});

// Auth

export const useSignIn = () => useMutation(SIGN_IN, {
    errorPolicy: "all",
    update(cache, { data: { signIn } }) {
        cache.writeQuery({
            query: GET_AUTH_USER,
            data: { user: signIn }
        })
    }
});

export const useLazyGetUser = () => useLazyQuery(GET_AUTH_USER);

export const useSignOut =() => useMutation(SIGN_OUT, {
    errorPolicy: "all",
});

export const useGetUser = () => useQuery(GET_AUTH_USER);
