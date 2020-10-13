import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/nprogress.scss";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(
    () => {
        return import("../components/shared/TopProgressBar");
    },
    {ssr: false},
);

const MyApp = ({Component, pageProps}) => {
    return (
        <>
            <TopProgressBar/>
            <Component {...pageProps} />
        </>
    )
};

export default MyApp;
