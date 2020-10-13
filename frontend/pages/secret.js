import React from 'react';
import withApollo from '@/hoc/withApollo'
import {getDataFromTree} from "@apollo/client/react/ssr";
import withAuth from "@/hoc/withAuth";
import BaseLayout from "../layouts/baseLayout";

const Secret = withAuth(() => {

    return (
        <BaseLayout>
            <div>
                <div className="container">
                    <div className="bwm-form mt-5">
                        <div className="row">
                            <div className="col-md-5 mx-auto">
                                <h1 className="page-title">Secret</h1>
                                SECRET PAGE
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}, 'admin', {ssr: true});

export default withApollo(Secret);
