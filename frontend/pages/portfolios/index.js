import React from 'react';
import Link from 'next/link';
import withApollo from '@/hoc/withApollo'
import {getDataFromTree} from "@apollo/client/react/ssr";
import {useGetPortfolio} from '@/apollo/actions/index'
import PortfolioCard from "@/components/portfolio";
import BaseLayout from "../../layouts/BaseLayout";
import Spinner from "react-bootstrap/Spinner";


const Portfolios = () => {
    const {data, loading, error} = useGetPortfolio();
    const portfolios = data && data.portfolios || [];

    if (loading || !portfolios || typeof window === 'undefined') {
        return (
            <BaseLayout>
                <Spinner className="spinner" size="lg" animation="border" variant="danger"/>
            </BaseLayout>
        )
    }
    return (
        <BaseLayout>
            <div className="container">
                <section className="section-title">
                    <div className="px-2">
                        <div className="pt-5 pb-4">
                            <h1>Portfolios</h1>
                        </div>
                    </div>
                </section>
                <section className="pb-5">
                    <div className="row">
                        {portfolios.map(portfolio => {
                            return (
                                <div key={portfolio._id} className="col-md-4">
                                    <Link href="/portfolios/[id]"
                                          // portfolio._id && portfolio._id : portfolio.slug
                                          as={`/portfolios/${portfolio._id}`}>
                                        <a className="card-link">
                                            {/*slug={!!portfolio._id}*/}
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
