import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client';
import { getDataFromTree } from "@apollo/client/react/ssr";

import withApollo from '@/hoc/withApollo'
import portfolioQueries from '@/apollo/queries/index';
const { GET_PORTFOLIO } = portfolioQueries;

const PortfolioDetail = (props) => {
    const router = useRouter();
    const id = router.query.id;
    const { data, loading, error } = useQuery(GET_PORTFOLIO, {variables: { id }});
    const portfolio = data && data.portfolio || {};

    return (
        <div className="portfolio-detail">
            <div className="container">

                <div className="jumbotron">
                    <h1 className="display-3">{portfolio.title}</h1>
                    <p className="lead">{portfolio.jobTitle}</p>
                    <p>
                        <a className="btn btn-lg btn-success" href={portfolio.companyWebsite} role="button">
                            See Company</a>
                    </p>
                </div>

                <div className="row marketing">
                    <div className="col-lg-6">
                        <h4 className="title">Location</h4>
                        <p className="text">{portfolio.location}</p>
                        <h4 className="title">Start Date</h4>
                        <p className="text">{portfolio.startDate}</p>
                        {/*<p className="text">{formatDate(portfolio.startDate)}</p>*/}
                    </div>

                    <div className="col-lg-6">
                        {/* TODO: days later... */}
                        <h4 className="title">Days</h4>
                        {/*<p className="text">{portfolio.daysOfExperience}</p>*/}

                        <h4 className="title">End Date</h4>
                        <p className="text">{(portfolio.endDate && portfolio.endDate) || 'Present'}</p>
                        {/*<p className="text">{(portfolio.endDate && formatDate(portfolio.endDate)) || 'Present'}</p>*/}
                    </div>
                    <div className="col-md-12">
                        <hr/>
                        <h4 className="title">Description</h4>
                        <p>{portfolio.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

// PortfolioDetail.getInitialProps = async ({query}) => {
//     return {query}
// };

export default withApollo(PortfolioDetail, { getDataFromTree });
