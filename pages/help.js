import React from "react";
import Head from "next/head";
import { HomeLayout } from "../app/layouts";

export default function Help() {
    return (
        <HomeLayout title="Help & Support">
            <Head>
                <title>Просто ТВ | Поддержка</title>
            </Head>
            <div>
                <p>Добро пожаловать на страницу поддержки</p>
            </div>
        </HomeLayout>
    );
}
