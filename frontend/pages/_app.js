import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/index.scss';
import Navbar from "@/components/shared/navbar";
import Hero from "@/components/shared/hero";


const MyApp = ({Component, pageProps}) => {

    return (
        <div>
            <Navbar/>
            { Component.name === 'Home' && <Hero/> }
            <Component {...pageProps} />
        </div>
    )


};
export default MyApp;
