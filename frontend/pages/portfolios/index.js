import React from 'react';
import Link from 'next/link';
import withApollo from '@/hoc/withApollo'
import {getDataFromTree} from "@apollo/client/react/ssr";

import {useGetPortfolio} from '@/apollo/actions/index'
import PortfolioCard from "@/components/portfolio";
import AppLink from "../../components/shared/appLink";
import BaseLayout from "../../layouts/baseLayout";


const Portfolios = () => {
    const {data, loading, error} = useGetPortfolio();
    const portfolios = data && data.portfolios || [];

    return (
        <BaseLayout>
            <div className="container">
                <section className="section-title">
                    <div className="px-2">
                        <div className="pt-5 pb-4">
                            <h1>Portfolios</h1>
                        </div>
                    </div>
                    <AppLink
                        href="/portfolios/new"
                        className="btn btn-primary">
                        Create Portfolio
                    </AppLink>
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
                                </div>
                            )
                        })
                        }
                    </div>
                </section>
            </div>
        </BaseLayout>
    )
};

export default withApollo(Portfolios, {getDataFromTree});
