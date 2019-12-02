import React, { useContext } from 'react'
import Head from 'next/head'
import { ChannelContex } from "../app/context";

const Home = () => {
    const channels = useContext(ChannelContex);

    return (
        <>
            <Head>
                <title>Просто ТВ</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
        </>
    );
};

export default Home
