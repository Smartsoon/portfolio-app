import React from "react";
import BaseLayout from "../layouts/baseLayout";

const ErrorPage = () => {
    return (
        <BaseLayout>
            <div className="error-page-text-wrapper">
                <p className="text-danger error-page-text">Ooops.. Error 404. Page not found.</p>
            </div>
        </BaseLayout>
    )
};

export default ErrorPage;
