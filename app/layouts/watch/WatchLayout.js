import React, { useEffect } from 'react';
import Head from 'next/head'
import { Header, ProfileBar } from "../../components/header";
import { RubberBand } from "../../components/animations";
import { Aside } from "../../containers/aside";
import WatchAsideContent from "./WatchAsideContent";

import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { fetchChannelsRedux } from '../../services/channels';
import { getChannelsError, getChannels, getChannelsPending, getSelectChannel } from '../../redux/reducers';
import { setChannel } from "../../redux/actions/channels";

const WatchLayout = ({ children, title, isAuthenticated, ...props }) => {
    useEffect(  () => {
        props.fetchChannels();

        return () => {

        };

    }, []);

    let { channel, pending } = props;
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
                {/*<script type="text/javascript" src="/jw/jw.js"></script>*/}
            </Head>
            <Header>
                <div className="row">
                    <div className="col-2 col-md-4 d-flex align-items-center">
                    </div>
                    <div className="col-auto col-md-4 align-items-center justify-content-center d-none d-md-flex">
                        <RubberBand>
                            <div className="brand">
                                <a className="brand d-flex align-items-center" href="/">
                                    <strong className="p-1 fs-6 fs-lg-8">
                                        { channelName }
                                    </strong>
                                </a>
                            </div>
                        </RubberBand>
                    </div>
                    <div className="col-auto d-flex justify-content-end justify-content-lg-end align-items-center navbar-secondary ml-auto">
                        <ProfileBar isAuthenticated={ isAuthenticated } />

                        <div className="">
                            <Aside>
                                <WatchAsideContent />
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
    error: getChannelsError(state),
    channels: getChannels(state),
    pending: getChannelsPending(state),
    channel: getSelectChannel(state),
    isAuthenticated: !!state.authentication.token
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchChannels: fetchChannelsRedux,
    selectChannel: setChannel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WatchLayout);
