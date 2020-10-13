import React from "react";
import AppNavbar from "@/components/shared/navbar";
import Hero from "@/components/shared/hero";
import {toast, ToastContainer} from 'react-toastify';
import {useRouter} from "next/router";

const BaseLayout = ({children, page = ''}) => {
    const router = useRouter();
    const {message} = router.query;

    return (
        <>
            <div className="navbar-wrapper">
                <AppNavbar/>
            </div>
            {page === 'Home' && <Hero/>}
            {children}
            <div className="d-none">
                {(message && message === 'ACCESS_DENIED') && toast.warning('Access denied!', {autoClose: 3000})}
                {(message && message === 'NOT_AUTHORIZED') && toast.warning('Please log in to get the access!', {autoClose: 3000})}
            </div>
            <ToastContainer/>
        </>
    )
};

export default BaseLayout;
