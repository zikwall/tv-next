import React from "react";
import cn from 'classnames';
import './index.css';

export const Tab = ({ onClick, children, selected }) => {
    return (
        <li onClick={ onClick }>
            <div className={cn({
                'ui_tab': true,
                'ui_tab_sel': selected
            })} role="link">
                <a>{ children }</a>
            </div>
        </li>
    );
};

const Tabs = ({ children }) => {
    return (
        <>
            <ul className="ui_tabs clear_fix page_info_tabs">
                { children }
            </ul>
        </>
    );
};

Tabs.Tab = Tab;

export default Tabs;