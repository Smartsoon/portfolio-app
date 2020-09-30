import {useMutation, useQuery} from "@apollo/client";

import portfolioQueries from '@/apollo/queries/index';
const { GET_PORTFOLIOS } = portfolioQueries;
import portfolioMutations from '@/apollo/mutations/index';
const { CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO } = portfolioMutations;

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
