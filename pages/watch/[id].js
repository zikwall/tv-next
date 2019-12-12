import React from 'react';
import Head from 'next/head';
import { connect } from "react-redux";
import { ChannelLayout } from "../../app/layouts";
import { ProgramDescription } from '../../app/components/program-description'
import { Player } from "../../app/containers/player";
import { CommentsList } from "../../app/containers/comments";
import { FakeData } from "../../app/util";
import { getChannel } from "../../app/services/channels/Channels";
import { getChannelsPending, getSelectChannel} from "../../app/redux/reducers";
import { setChannel } from "../../app/redux/actions";

const Watch = ({ isServer }) => {
    return (
        <ChannelLayout title="Home">
            <Head>
                <title>Просто ТВ</title>

                {
                    isServer && <script type="text/javascript" src="/jw/jw.js"></script>
                }
            </Head>

            <div className="row">
                <div className="col-md-9">
                    <Player />

                    <div className="wall_module">
                        <CommentsList comments={ FakeData.ExampleCommentSet }/>
                    </div>

                </div>
                <div className="col-md-3">
                    <ProgramDescription />
                </div>
            </div>
        </ChannelLayout>
    );
};

Watch.getInitialProps = async ({ query, store, isServer }) => {
    const { id } = query;

    const channel = await getChannel(id);
    await store.dispatch(setChannel(channel));

    return {
        channel: channel,
        isServer: isServer
    }
};

const mapStateToProps = state => ({
    pending: getChannelsPending(state),
    channel: getSelectChannel(state),
});

export default connect(mapStateToProps)(Watch);
