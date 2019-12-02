import React from 'react';
import { TabsItem } from "@vkontakte/vkui";

export default ({click, name, isActive}) => {
    return (
        <TabsItem onClick={ click } selected={ isActive }>
            { name }
        </TabsItem>
    );
};