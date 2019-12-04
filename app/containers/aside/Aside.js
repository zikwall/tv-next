import React, { useState } from 'react';
import './index.css';
import { MenuLite, Menu } from "../../components/ui/icons";
import classNames  from 'classnames';

const Aside = ({ children }) => {
    const [pulled, setPulled] = useState(false);

    const toggle = () => {
        setPulled(!pulled);
    };

    const isPulled = () => {
        return pulled === true;
    };

    return (
        <>
            <div className="adonis-player-wrap">
                <a onClick={ toggle } className="toggle-off-canvas" tabIndex="0">
                    <span className="adonis-icon icon-4x">
                         <Menu />
                    </span>
                </a>

                <div className={ classNames({
                    'off-canvas-overlay': true,
                    'overlay-on': isPulled()
                })}></div>

                <div className={ classNames({
                    'adonis-playlist off-canvas off-canvas-right d-flex flex-column': true,
                    'show': isPulled()
                })}>
                    <div className="close-header">
                        <a onClick={ toggle } className="close-offcanvas m-3" style={{ paddingRight: '1rem' }}>
                            <span className="adonis-icon icon-3x">
                                <MenuLite />
                            </span>
                        </a>
                    </div>

                    <div className="col-md-3 flex-column-sidebar-md sidebar">
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
};

export default Aside;
