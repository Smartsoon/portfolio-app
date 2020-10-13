import React from 'react';
import {useRouter} from "next/router";
import withApollo from '@/hoc/withApollo'
import {getDataFromTree} from "@apollo/client/react/ssr";
import withAuth from "@/hoc/withAuth";
import CreateNewPortfolioForm from "@/components/forms/createNewPortfolioForm";
import {useCreatePortfolio} from '@/apollo/actions/index'
import BaseLayout from "../../layouts/baseLayout";
import {toast} from "react-toastify";


const CreateNewPortfolio = () => {
    const [createPortfolio, {error, loading}] = useCreatePortfolio();
    const router = useRouter();
    const handleCreatePortfolio = async (data) => {
        if (data && !data.startDate) {
            return "Start date is nor required"
        }
        try {
            await createPortfolio({variables: data});
            await router.push('/portfolios');
            toast.success('Portfolio has been created', {autoClose: 3000})
        } catch (e) {
            return e
        }
    };

    const errorMessage = (error) => {
        return (error.graphQLErrors && <div className="d-none">{toast.error(error.graphQLErrors[0].message, {autoClose: 3000})}</div>
            ||
            <div className="d-none">{toast.error("Oops... Something went wrong!", {autoClose: 3000})}</div>
        )};

    return (
        <BaseLayout>
            <div>
                <div className="container">
                    <div className="bwm-form mt-5">
                        <div className="row">
                            <div className="col-md-5 mx-auto">
                                <h1 className="page-title">Create New Portfolio</h1>
                                {error && errorMessage(error)}
                                <CreateNewPortfolioForm onSubmit={handleCreatePortfolio}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
};

export default withApollo(withAuth(CreateNewPortfolio, ['admin', 'instructor'], {ssr: false}), {getDataFromTree});
