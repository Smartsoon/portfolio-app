import React, {useEffect, useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Link from 'next/link'
import withApollo from "@/hoc/withApollo";

import {useLazyGetUser} from '@/apollo/actions/index';
import {getDataFromTree} from "@apollo/client/react/ssr";

const AppLink = ({children, className, href}) =>
    <Link href={href}>
        <a className={className}>{children}</a>
    </Link>;

const AppNavbar = () => {
    const [user, setUser] = useState(null);
    const [hasResponse, setHasResponse] = useState(false);
    const [getUser, {data, loading, error}] = useLazyGetUser();

    useEffect(() => {
        getUser();
    }, []);

    if (data) {
        if (data.user && !user) {
            setUser(data.user);
        }
        if (!data.user && user) {
            setUser(null);
        }
        if (!hasResponse) {
            setHasResponse(true)
        }
    }

    return (
        <div className="navbar-wrapper">
            <Navbar expand="lg" className=" navbar-dark fj-mw9">
                <AppLink href="/" className="mr-3 font-weight-bold navbar-brand">NesteeDev</AppLink>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <AppLink href="/portfolios" className="mr-3 nav-link">
                            Portfolio
                        </AppLink>
                        <AppLink href="/forum/categories" className="mr-3 nav-link">
                            Forum
                        </AppLink>
                        <AppLink href="/cv" className="mr-3 nav-link">
                            Cv
                        </AppLink>
                    </Nav>

                    {
                        user ?
                            <Nav className="">
                                <div className="mr-3 d-flex align-self-center align-items-center">
                                    <div className="mr-1">
                                        {
                                            user.avatar ?
                                                <img src={user.avatar} height="25px" alt=""/>
                                                :
                                                <img
                                                    src="https://annam-finefood.com/wp-content/uploads/2016/09/no-avatar.png"
                                                    height="25px" alt=""/>
                                        }
                                    </div>
                                    <div className="nav-link btn">{user.username}</div>
                                </div>

                                < AppLink href="/logout" className="mr-3 nav-link btn btn-danger bright text-white">
                                    Sign Out
                                </AppLink>
                            </Nav>
                            :
                            <Nav className="">
                                < AppLink href="/login" className="mr-3 btn nav-link ">
                                    Sign In
                                </AppLink>
                                <AppLink href="/register" className="mr-3 nav-link btn btn-success bg-green-2 bright">
                                    Sign Up
                                </AppLink>
                            </Nav>
                    }


                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

export default withApollo(AppNavbar, {getDataFromTree});
