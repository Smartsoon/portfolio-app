import React from "react";
import App from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/index.scss';
import AppNavbar from "@/components/shared/navbar";
import Hero from "@/components/shared/hero";

const MyApp = ({Component, pageProps}) => {

    return (
        <div>
            <AppNavbar/>
            {Component.name === 'Home' && <Hero/>}
            <Component {...pageProps} />
        </div>
    )
};

export default MyApp;
