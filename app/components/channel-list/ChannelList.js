import React from 'react';
import { ChannelPlaceholders } from "./ChannelPlaceholder";

import { Group, Cell, List, Avatar, Progress } from "@vkontakte/vkui";
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';
import { useSnackbar } from "notistack";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getChannelsError, getChannels, getChannelsPending } from '../../redux/reducers';
import { setChannel } from "../../redux/actions/channels";
import { MathHelper } from '../../util';

const ChannelList = (props) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleMoreClick = (e) => {
        e.preventDefault();
        enqueueSnackbar('Хо-хо, вы нажали на точечки? Походу да!', {
            variant: 'success',
        });
    };

    const handleSelectChannel = (e) => {
        e.preventDefault();
        //let epg_id = e.currentTarget.dataset.epgid;
        let channel_id = e.currentTarget.dataset.channelid;

        props.selectChannel(props.channels[channel_id])
    };

    const filterChannels = (channels) => {
        const ss = props.search.toLowerCase();
        return channels.filter(({name}) => name.toLowerCase().indexOf(ss) > -1);
    };

    const renderChannels = (channels) => {

        return channels.map((channel, index) => {
            return (
                <Cell key={index}
                      before={<Avatar type="app" src="https://pp.userapi.com/c841025/v841025503/617f7/bkN1Def0s14.jpg" />}
                      description="08:00 - 09:59"
                      asideContent={
                          <a href="#" onClick={ handleMoreClick }>
                              <Icon24MoreHorizontal fill="var(--accent)"/>
                          </a>
                      }
                >

                    <a href="#"
                       data-channelid={ index }
                       data-epgid={ channel.epg_id }
                       onClick={ handleSelectChannel }> { channel.name }
                    </a>
                    <Progress value={ MathHelper.randomInteger(0, 100) } />
                </Cell>
            )
        });
    };


    const { channels, pending } = props;

    if (pending === true) {
        return <ChannelPlaceholders count={5} />
    }

    return (
        <div style={{width: '300px', maxHeight: '75vh'}}>
            <div id="sticky-sidebar">
                <div className="inner-wrapper-sticky" style={{position: 'relative'}}>
                    <Group>
                        <List>
                            {
                                renderChannels(filterChannels(channels))
                            }
                        </List>
                    </Group>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    error: getChannelsError(state),
    channels: getChannels(state),
    pending: getChannelsPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectChannel: setChannel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
