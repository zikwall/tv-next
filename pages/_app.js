import React from 'react'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";

import { ChannelContex } from '../app/context';
import { SnackbarProvider } from 'notistack';

import '../app/assets/css/main.css'
import '../app/assets/css/anumation.css';
import '../app/assets/css/custom.css';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger();
import rootReducer from '../app/redux/reducers'


const makeStore = (initialState, options) => {
    return createStore(rootReducer, initialState, applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));
};

class MyApp extends App {

    state = {
        channels: null
    };

    componentDidMount = () => {};

    //static getInitialProps({store, isServer, pathname, query}) {
        //return {custom: 'custom'};
    //

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Provider store={ store }>
                <SnackbarProvider maxSnack={ 3 } autoHideDuration={ 2000 }>
                    <ChannelContex.Provider value={ this.state.channels }>
                        <Component {...pageProps} />
                    </ChannelContex.Provider>
                </SnackbarProvider>
            </Provider>
        )
    }
}

export default withRedux(makeStore)(MyApp)
