import React from 'react';
import Link from 'next/link';
import withApollo from '@/hoc/withApollo'
import { getDataFromTree } from "@apollo/client/react/ssr";

import { useGetPortfolio, useCreatePortfolio ,useUpdatePortfolio, useDeletePortfolio } from '@/apollo/actions/index'
import PortfolioCard from "@/components/portfolio";


const Portfolios = () => {

    const { data, loading, error } = useGetPortfolio();
    const [createPortfolio] = useCreatePortfolio();
    const [updatePortfolio] = useUpdatePortfolio();
    const [deletePortfolio] = useDeletePortfolio();

    const portfolios = data && data.portfolios || [];

    return (
        <div>
            <div className="container">
                <section className="section-title">
                    <div className="px-2">
                        <div className="pt-5 pb-4">
                            <h1>Portfolios</h1>
                        </div>
                    </div>
                    <button
                            onClick={createPortfolio}
                            className="btn btn-primary">
                        Create Portfolio
                    </button>
                </section>
                <section className="pb-5">
                    <div className="row">
                        {portfolios.map(portfolio => {
                            return (
                                <div key={portfolio._id} className="col-md-4">
                                    <Link href="/portfolios/[id]"
                                          as={`/portfolios/${portfolio._id}`}>
                                        <a className="card-link">
                                            <PortfolioCard portfolio={portfolio}/>
                                        </a>
                                    </Link>
                                    <button
                                        onClick={() => updatePortfolio({ variables: { id: portfolio._id } })}
                                        className="btn btn-info">
                                        Update Portfolio
                                    </button>
                                    <button
                                        onClick={() => deletePortfolio({ variables: { id: portfolio._id } })}
                                        className="btn btn-danger">
                                        Delete Portfolio
                                    </button>
                                </div>
                            )
                        })
                        }
                    </div>
                </section>
            </div>
        </div>

    )
};

export default withApollo(Portfolios, { getDataFromTree });
