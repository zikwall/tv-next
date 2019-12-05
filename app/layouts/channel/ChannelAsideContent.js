import React, { useState } from "react";
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import TrackVisibility from 'react-on-screen';
import { Menu, MenuActiveItem } from "../../components/ui/menu";
import { ChannelList } from "../../components/channel-list";
import { Search } from "../../components/ui";

const ChannelAsideContent = () => {
    const [search, setSearch] = useState('');

    const onSearch = (search) => {
        setSearch(search);
    };

    return (
        <>
            <Menu>
                <MenuActiveItem isActive url="/" >
                    Go to Home
                </MenuActiveItem>
                <MenuActiveItem url="/help" >
                    Help &amp; Support
                </MenuActiveItem>
                <MenuActiveItem url="/contact" >
                    Contact
                </MenuActiveItem>
                <MenuActiveItem url="/privacy" >
                    Terms &amp; Privacy
                </MenuActiveItem>
            </Menu>

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
