import React from "react";
import {useRouter} from "next/router";
import withApollo from "../../../hoc/withApollo";
import withAuth from "../../../hoc/withAuth";
import BaseLayout from "../../../layouts/baseLayout";
import {useGetPortfolioById, useUpdatePortfolio} from "../../../apollo/actions";
import CreateNewPortfolioForm from "../../../components/forms/createNewPortfolioForm";
import {getDataFromTree} from "@apollo/client/react/ssr";
import { toast } from 'react-toastify';


const PortfolioEdit = () => {
    const router = useRouter();
    const id = router.query.id;
    const [updatePortfolio, {error, loading: {load}}] = useUpdatePortfolio();
    const {data, loading} = useGetPortfolioById({variables: {id}});
    const portfolio = data && data.portfolio || {};

    const errorMessage = (error) => {
        return (error.graphQLErrors && <div className="d-none">{toast.error(error.graphQLErrors[0].message, {autoClose: 3000})}</div>
            ||
            <div className="d-none">{toast.error("Oops... Something went wrong!", {autoClose: 3000})}</div>
        )};

    const handlePortfolioUpdate = async (data) => {
        try {
            if (data && !data.startDate) {
                return "Start date is nor required"
            }

            await updatePortfolio({variables: {id, ...data}});
            await router.push('/portfolios');
            toast.info('Portfolio has been updated', {autoClose: 3000})
        } catch (e) {
            return e
        }
    };

    return(
        <BaseLayout>
            <div>
                <div className="container">
                    <div className="bwm-form mt-5">
                        <div className="row">
                            <div className="col-md-5 mx-auto">
                                <h1 className="page-title">Edit Portfolio</h1>
                                {error && errorMessage(error)}
                                <CreateNewPortfolioForm defaultValues={portfolio} onSubmit={handlePortfolioUpdate}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
};

export default withApollo(withAuth(PortfolioEdit, ['admin', 'instructor'], {ssr: true}), {getDataFromTree});
