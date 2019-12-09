import React from 'react'
import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";

import { SnackbarProvider } from 'notistack';

import '@vkontakte/vkui/dist/vkui.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import '../app/assets/css/main.css'
import '../app/assets/css/anumation.css';
import '../app/assets/css/custom.css';

import { makeStore } from "../app/redux/Store";
import { Initialize } from '../app/services/auth';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        Initialize(ctx);

        return {
            pageProps: {
                ...(Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {})
            }
        };
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Provider store={ store }>
                <SnackbarProvider maxSnack={ 3 } autoHideDuration={ 2000 }>
                    <Component {...pageProps} />
                </SnackbarProvider>
            </Provider>
        )
    }
}

export default withRedux(makeStore)(MyApp)
