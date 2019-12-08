import './index.css';
import Link from "next/link";
import classNames from 'classnames';
import { withRouter } from 'next/router';
import propTypes from 'prop-types';
import React from 'react';

export const MenuActiveItem = withRouter(({ url, router, children, isVisible }) => {
    let isActive = false;

    if (router.pathname === url) {
        isActive = true;
    }

    let requiredProps = { isActive, url, isVisible };

    return <MenuItem { ...requiredProps }>{ children }</MenuItem>;
});

export const MenuItem = ({ url, children, isActive, isVisible }) => {
    if (!isVisible) {
        return null;
    }

    const classItem = classNames({
        "ui_rmenu_item": true,
        "ui_rmenu_item_sel": isActive
    });

    return (
        <Link href={ url }>
            <a className={ classItem }><span> { children } </span></a>
        </Link>
    );
};

export const Menu = ({ children }) => {
    return (
        <div className="ui_rmenu ui_rmenu_pr" role="list">
            { children }
        </div>
    );
};

MenuItem.defaultProps = {
    isVisible: true,
};

MenuActiveItem.propTypes = {
    isVisible: propTypes.bool,
    url: propTypes.string,
    isActive: propTypes.bool
};
