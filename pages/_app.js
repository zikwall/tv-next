import React from 'react'
import App from 'next/app'
import { ChannelContex } from '../app/context';
import { getChannels } from "../app/services";

import '../app/assets/css/main.css'
import '../app/assets/css/anumation.css';
import '../app/assets/css/custom.css';

class MyApp extends App {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps(appContext) {
    //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    //   const appProps = await App.getInitialProps(appContext);
    //
    //   return { ...appProps }
    // }

    state = {
        channels: null
    };

    componentDidMount = () => {
        getChannels().then((res) => {
            if(res.error) {
                throw(res.error);
            }

            return res;
        }).catch((error) => {
            console.log(error)
        }).then((res) => {
            this.setState({
                channels: res
            });
        })
    };

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <ChannelContex.Provider value={ this.state.channels }>
                    <Component {...pageProps} />
                </ChannelContex.Provider>
            </>
        )
    }
}

export default MyApp
