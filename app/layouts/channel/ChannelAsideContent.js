import React, { useState } from "react";
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import TrackVisibility from 'react-on-screen';
import { ChannelList } from "../../components/channel-list";
import { Search } from "../../components/ui";
import { Menu } from "../../components/menu";

const ChannelAsideContent = () => {
    const [search, setSearch] = useState('');

    const onSearch = (search) => {
        setSearch(search);
    };

    return (
        <>
            <Menu />

            <div style={{marginBottom: '5px'}}>
                <Search value={ search } onSearch={ onSearch } />
            </div>

            <OverlayScrollbarsComponent
                options={{
                    scrollbars: {autoHide: "leave"}
                }}
            >
                <TrackVisibility>
                    {({ isVisible }) =>

                        <ChannelList search={ search } />
                    }
                </TrackVisibility>
            </OverlayScrollbarsComponent>
        </>
    )
};

export default ChannelAsideContent;
