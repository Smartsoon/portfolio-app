import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router'
import {getDataFromTree} from "@apollo/client/react/ssr";

import withApollo from '@/hoc/withApollo'
import BaseLayout from "@/layouts/baseLayout";
import {useGetPortfolioById} from "../../../apollo/actions";
import {formatDate, setDaysOfExperience} from "../../../utils/functions";


const PortfolioDetail = ({slug}) => {
    const [portfolioStartDate, setPortfolioStartDate] = useState(null);
    const [portfolioEndDate, setPortfolioEndDate] = useState(null);
    const [portfolioDateDifference, setPortfolioDateDifference] = useState(null);
    const router = useRouter();
    const id = router.query.id;
    // const slugOrId = slug ? {router, id} : {id};
    const {data, loading} = useGetPortfolioById({variables: {id}});
    const portfolio = data && data.portfolio || {};

    useEffect(() => {
        let {startDate, endDate} = portfolio;

        if (!endDate && startDate) {
            setPortfolioStartDate(formatDate(startDate));
            setPortfolioEndDate('Still working...');
            setPortfolioDateDifference(setDaysOfExperience(startDate, null))
        }

        if (startDate & endDate) {
            setPortfolioStartDate(formatDate(startDate));
            setPortfolioEndDate(formatDate(endDate));
            setPortfolioDateDifference(setDaysOfExperience(startDate, endDate))
        }
    }, [portfolio]);

    return (
        <BaseLayout>
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
                            <p className="text">{portfolioStartDate}</p>
                        </div>

                        <div className="col-lg-6">
                            {/* TODO: days later... */}
                            <h4 className="title">Days</h4>
                            <p className="text">{portfolioDateDifference}</p>

                            <h4 className="title">End Date</h4>
                            <p className="text">{portfolioEndDate}</p>
                        </div>
                        <div className="col-md-12">
                            <hr/>
                            <h4 className="title">Description</h4>
                            <p>{portfolio.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
};

export default withApollo(PortfolioDetail, {getDataFromTree});
