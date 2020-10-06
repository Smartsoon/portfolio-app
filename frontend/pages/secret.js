import React from 'react';
import withApollo from '@/hoc/withApollo'
import { getDataFromTree } from "@apollo/client/react/ssr";
import withAuth from "@/hoc/withAuth";

const Secret = withAuth(() => {

    return (
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

    )
}, 'admin');

export default withApollo(Secret, { getDataFromTree });
