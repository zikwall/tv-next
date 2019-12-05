import React, { useContext } from 'react'
import Head from 'next/head'
import { connect } from "react-redux";
import { ChannelContex } from "../app/context";
import { ChannelLayout } from "../app/layouts";
import { ProgramDescription } from '../app/components/program-description'
import { Player } from "../app/containers/player";
import { CommentsList } from "../app/containers/comments";
import { FakeData } from "../app/util";

const Channel = () => {
    const channels = useContext(ChannelContex);

    return (
        <ChannelLayout title="Home">
            <Head>
                <title>Просто ТВ</title>
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

export default connect(state => state)(Channel);
