import React, { useContext } from 'react'
import Head from 'next/head'
import { ChannelContex } from "../app/context";
import { MainLayout } from "../app/layouts";
import { ProgramDescription } from '../app/components/program-description'
import { Player } from "../app/containers/player";

const Home = () => {
    const channels = useContext(ChannelContex);

    return (
        <MainLayout title="Home">
            <Head>
                <title>Просто ТВ</title>
            </Head>

            <div className="row">
                <div className="col-md-9">
                    <Player />
                </div>
                <div className="col-md-3">
                    <ProgramDescription />
                </div>
            </div>
        </MainLayout>
    );
};

export default Home
