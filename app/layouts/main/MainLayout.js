import React from 'react';
import Head from 'next/head'
import { Header } from "../../components/header";
import { RubberBand } from "../../components/animations";
import { Aside } from "../../containers/aside";
import HomeAsideContent from "./HomeAsideContent";

const MainLayout = ({ children, title }) => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://iconicthemes.net/adonis/assets/vendors/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,500,700" />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header>
                <div className="row">
                    <div className="col-2 col-md-4 d-flex align-items-center">
                    </div>
                    <div className="col-auto col-md-4 align-items-center justify-content-center d-none d-md-flex">
                        <RubberBand>
                            <div className="brand">
                                <a className="brand d-flex align-items-center" href="/">
                                    <strong className="p-1 fs-6 fs-lg-8">
                                        { title }
                                    </strong>
                                </a>
                            </div>
                        </RubberBand>
                    </div>
                    <div className="col-auto d-flex justify-content-end justify-content-lg-end align-items-center navbar-secondary ml-auto">
                        <div className="">
                            <Aside>
                                <HomeAsideContent />
                            </Aside>
                        </div>
                    </div>
                </div>
            </Header>

            <main className="app">
                <div className="master-container-fluid">
                    { children }
                </div>
            </main>
        </>
    )
};

export default MainLayout;
