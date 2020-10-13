import React from "react";
import BaseLayout from "../../../layouts/baseLayout";
import {Card, Button} from 'react-bootstrap';
import {useDeletePortfolio, useGetPortfolio, useGetUser, useGetUserPortfolios} from "../../../apollo/actions";
import withApollo from '@/hoc/withApollo'
import {getDataFromTree} from "@apollo/client/react/ssr";
import withAuth from "../../../hoc/withAuth";
import AppLink from "../../../components/shared/appLink";
import {toast} from "react-toastify";
import {formatDate} from "../../../utils/functions";

const instructorDashboard = withAuth(() => {
    const {data: {user} = {} } = useGetUser();
    const {data: {portfoliosFromOtherPage} = []} = useGetPortfolio();
    const portfolios = portfoliosFromOtherPage && portfoliosFromOtherPage.portfolios || [];
    const {data, loading, error} = useGetUserPortfolios();
    const userPortfolios = data && data.userPortfolios || [];

    const [deletePortfolio] = useDeletePortfolio();

    return (
        <BaseLayout>
            <div>
                <div className="container">
                    <div className="bwm-form mt-5">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="page-title text-center">{user && <span className="text-success">{user.username}</span>} Portfolios</h1>
                                {
                                    userPortfolios.map(userPortfolio => {
                                        return (

                                            <Card key={userPortfolio._id} className="mb-2">
                                                <Card.Header>{userPortfolio.title}</Card.Header>
                                                <Card.Body>
                                                    <Card.Title className="mb-3">
                                                        {userPortfolio.jobTitle}
                                                    </Card.Title>

                                                    <Card.Subtitle className="mb-2">
                                                        {formatDate(userPortfolio.startDate)} - {userPortfolio.endDate ? formatDate(userPortfolio.endDate) : 'Still working...'}
                                                    </Card.Subtitle>

                                                    <Card.Text>
                                                        {userPortfolio.description}
                                                    </Card.Text>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <AppLink
                                                                href="/portfolios/[id]"
                                                                as={`/portfolios/${userPortfolio._id}`}
                                                                className="btn btn-primary mr-2">
                                                                Show Details
                                                            </AppLink>
                                                            <AppLink
                                                                href="/portfolios/[id]/edit"
                                                                as={`/portfolios/${userPortfolio._id}/edit`}
                                                                className="btn btn-info mr-2">
                                                                Update Portfolio
                                                            </AppLink>
                                                        </div>

                                                        <div>
                                                            <Button
                                                                onClick={async () => {
                                                                    await deletePortfolio({variables: {id: userPortfolio._id}});
                                                                    toast.warning(`Portfolio ${userPortfolio.title} has been deleted`, {autoClose: 3000})
                                                                }}
                                                                className="btn btn-danger">
                                                                Delete Portfolio
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}, ['admin', 'instructor'], {ssr: false});

export default withApollo(instructorDashboard, {getDataFromTree});
