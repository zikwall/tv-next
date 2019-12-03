import React, { useContext } from 'react'
import Head from 'next/head'
import { ChannelContex } from "../app/context";
import { MainLayout } from "../app/layouts";
import { Block, BlockBody } from "../app/components/ui";

const Home = () => {
    const channels = useContext(ChannelContex);

    return (
        <MainLayout title="Home">
            <Head>
                <title>Просто ТВ</title>
            </Head>

            <div className="row">
                <div className="col-md-9">
                    <Block>
                        <BlockBody>
                            Добро пожаловать на главную страницу
                        </BlockBody>
                    </Block>
                </div>
                <div className="col-md-3">
                    <Block>
                        <BlockBody>
                            Правый блок
                        </BlockBody>
                    </Block>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home
