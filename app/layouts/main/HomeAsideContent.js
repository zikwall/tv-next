import React from "react";
import { Menu, MenuActiveItem } from "../../components/ui/menu";
import { ChannelList } from "../../components/channel-list";
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import TrackVisibility from 'react-on-screen';

const HomeAsideContent = () => {
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

            <OverlayScrollbarsComponent
                options={{
                    scrollbars: {autoHide: "leave"}
                }}
            >
                <TrackVisibility>
                    {({ isVisible }) =>

                        <ChannelList search="" />
                    }
                </TrackVisibility>
            </OverlayScrollbarsComponent>
        </>
    )
};

export default HomeAsideContent;
