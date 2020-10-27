import React from 'react';
import BaseLayout from "../layouts/BaseLayout";
import {useGetHighlights} from "../apollo/actions";
import withApollo from "../hoc/withApollo";
import {getDataFromTree} from "@apollo/client/react/ssr";
import Footer from "@/components/shared/footer";
import Spinner from "react-bootstrap/Spinner";
import PortfolioCard from "../components/portfolio";
import Link from "next/link";
import {fromNow, shortify} from "../utils/functions";

const Home = () => {
    const {data, loading} = useGetHighlights({variables: {limit: 3}});
    const portfolios = data && data.highlight.portfolios || [];
    const topics = data && data.highlight.topics || [];


    if (loading || typeof window === 'undefined') {
        return (
            <BaseLayout>
                <Spinner className="spinner" size="lg" animation="border" variant="danger"/>
            </BaseLayout>
        )
    }

    return (
        <BaseLayout page='Home'>
            <div className="portfolio-app">
                <div className="container mb-5">

                    <section className="section-title">
                        <div className="px-2">
                            <div className="pt-5 pb-4">
                                <h1>Portfolios</h1>
                            </div>
                        </div>
                    </section>

                    <section className="pb-5">
                        <div className="row">
                            {
                                portfolios.map(portfolio => {
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

                    <Link href="/portfolios">
                        <a className="btn btn-main bg-blue ttu">See More Portfolios</a>
                    </Link>


                    <section className="section-title">
                        <div className="px-2">
                            <div className="pt-5 pb-4">
                                <h1>Ask Me</h1>
                            </div>
                        </div>
                    </section>
                    <section className="pb-5">
                        <div className="list-group">
                            {
                                topics.map(topic => {
                                    return (
                                        <div className="pb-2" key={topic._id}>
                                            <Link href="forum/topics/[slug]" as={`forum/topics/${topic.slug}`}>
                                                <a href=""
                                                   className="list-group-item list-group-item-action flex-column align-items-start py-3 subtle-shadow no-border">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1 black">{topic.title}</h5>
                                                        <small>{fromNow(topic.createdAt)}</small>
                                                    </div>
                                                    <p className="mb-1">{shortify(topic.content, 300)}</p>
                                                    <div className="avatar-container my-2">
                                                        <img src={topic.user.avatar}
                                                             className="avatar-image mr-2"></img>
                                                        <span className="avatar-title">{topic.user.username}</span>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </section>
                    <Link href="/forum/categories">
                        <a className="btn btn-main bg-blue ttu">See More Posts</a>
                    </Link>
                </div>

                <Footer/>

            </div>
        </BaseLayout>
    )

};

export default withApollo(Home, {getDataFromTree})
