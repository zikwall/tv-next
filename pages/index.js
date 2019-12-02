import React, { useContext } from 'react'
import Head from 'next/head'
import { ChannelContex } from "../app/context";
import { MainLayout } from "../app/layouts";

const Home = () => {
    const channels = useContext(ChannelContex);

    return (
        <MainLayout title="Home">
            <Head>
                <title>Просто ТВ</title>
            </Head>

            <p>Добро пожаловать на домашнюю страницу</p>
        </MainLayout>
    );
};

export default Home
