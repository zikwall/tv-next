import React, { useContext } from 'react'
import Head from 'next/head'
import { ChannelContex } from "../app/context";
import Link from "next/link";

const Home = () => {
    const channels = useContext(ChannelContex);

    return (
        <>
            <Head>
                <title>Просто ТВ</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Link href="/about">
                <a>About</a>
            </Link>
        </>
    );
};

export default Home
