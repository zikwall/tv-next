import React from 'react';
import { Header } from "../../components/header";
import { RubberBand } from "../../components/animations";
import { Aside } from "../../containers/aside";
import { getChannelsPending, getSelectChannel } from "../../redux/reducers";
import { connect } from "react-redux";
import ChannelAsideContent from "./ChannelAsideContent";
import Head from "next/head";

const ChannelLayout = (props) => {
    let { channel, pending, children } = props;
    let channelName = 'Loading...';

    if (pending === false) {
        channelName = channel.name;
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://iconicthemes.net/adonis/assets/vendors/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,500,700" />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header>
                <div className="row">
                    <div className="col-2 col-md-4 d-flex align-items-center">
                    </div>
                    <div className="col-auto col-md-4 align-items-center justify-content-center d-none d-md-flex">
                        <RubberBand>
                            <div className="brand">
                                <a className="brand d-flex align-items-center" href="/">
                                    <span className="adonis-icon mr-md-2 color-dark mr-1 icon-5x">
                                        <img style={{width: '26px'}} src="https://cdn.limehd.tv/images/playlist_1channel.png" />
                                    </span>
                                    <strong className="p-1 fs-6 fs-lg-8">{ channelName }</strong>
                                </a>
                            </div>
                        </RubberBand>
                    </div>
                    <div className="col-auto d-flex justify-content-end justify-content-lg-end align-items-center navbar-secondary ml-auto">
                        <div className="mr-2">
                            <Aside>
                                <ChannelAsideContent />
                            </Aside>
                        </div>
                    </div>
                </div>
            </Header>

            <main className="app">
                <div className="master-container-fluid">
                    { children }
                </div>
            </main>
        </>
    )
};

const mapStateToProps = state => ({
    pending: getChannelsPending(state),
    channel: getSelectChannel(state),
});

export default connect(mapStateToProps)(ChannelLayout);
