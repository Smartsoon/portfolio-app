import React, {useEffect, useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import withApollo from "@/hoc/withApollo";
import {useLazyGetUser} from '@/apollo/actions/index';
import {getDataFromTree} from "@apollo/client/react/ssr";
import NavDropdown from "react-bootstrap/NavDropdown";
import AppLink from "./appLink";
import {useRouter} from 'next/router'

const AppNavbar = () => {
    const [user, setUser] = useState(null);
    const [hasResponse, setHasResponse] = useState(false);
    const [getUser, {data, loading, error}] = useLazyGetUser({
        fetchPolicy: 'network-only'
    });

    const userRoles = ['admin', 'instructor'];

    const router = useRouter();

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
        <Navbar expand="lg" className="navbar-wrapper navbar-dark fj-mw9">
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
                                <NavDropdown title={user.username} id="basic-nav-dropdown">
                                    {
                                        router.pathname !== '/' &&
                                        <AppLink className="dropdown-item" href="/">Home</AppLink>
                                    }

                                    {
                                        (router.pathname !== '/portfolios/new' && userRoles.includes(user.role)) &&
                                        <AppLink className="dropdown-item" href="/portfolios/new">Create
                                            Portfolio</AppLink>
                                    }

                                    {
                                        (router.pathname !== `/instructor/[id]/dashboard` && userRoles.includes(user.role)) &&
                                        <AppLink
                                            className="dropdown-item"
                                            href="/instructor/[id]/dashboard"
                                            as={`/instructor/${user._id}/dashboard`}
                                        >
                                            Dashboard
                                        </AppLink>
                                    }
                                    {
                                        router.pathname !== '/preferences' &&
                                        <AppLink className="dropdown-item" href="/">Preferences</AppLink>
                                    }

                                    <NavDropdown.Divider />
                                    <AppLink className="dropdown-item" href="/logout">Sign Out</AppLink>
                                </NavDropdown>
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
    )
};

export default withApollo(AppNavbar, {getDataFromTree});
