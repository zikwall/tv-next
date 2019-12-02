import React, { useState } from 'react';
import './index.css';
import { MenuLite, Menu } from "../../components/icons";
import classname  from 'classnames';

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

                <div className={classname({
                    'off-canvas-overlay': true,
                    'overlay-on': isPulled()
                })}></div>

                <div className={ classname({
                    'adonis-playlist off-canvas off-canvas-right d-flex flex-column': true,
                    'show': isPulled()
                })}>
                    <div className="close-header">
                        <a onClick={ toggle } className="close-offcanvas m-2">
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