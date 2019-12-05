import React from 'react';
import ContentLoader from "react-content-loader";

const ChannelPlaceholder = () => (
    <ContentLoader
        height={100}
        speed={1}
        primaryColor={'#333'}
        secondaryColor={'#999'}
    >
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />

    </ContentLoader>
);

export const ChannelPlaceholders = ({ count }) => {
    return [...new Array(count)].map((v, i) => {
        return <ChannelPlaceholder key={i}/>
    });
};

export default ChannelPlaceholder;