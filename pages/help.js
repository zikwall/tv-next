import React from "react";
import Head from "next/head";
import { MainLayout } from "../app/layouts";

export default function Help() {
    return (
        <MainLayout title="Help & Support">
            <Head>
                <title>Просто ТВ | Поддержка</title>
            </Head>
            <div>
                <p>Добро пожаловать на страницу поддержки</p>
            </div>
        </MainLayout>
    );
}
