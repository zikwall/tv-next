import React, { useState } from 'react';
import classNames from 'classnames';
import Link from "next/link";

const Item = ({ channelName, id }) => {
    const [isHovered, setIsHovered] = useState(false);

    const imageIconClassNames = classNames({
        'watch_row__cover_icon _watch_row__cover_icon': true,
        '_watch_row__cover_icon_visible': isHovered
    });

    const durationClassNames = classNames({
        'watch_row__duration watch_row__duration-s _watch_row__duration': true,
        '_watch_row__duration_is_visible': isHovered
    });

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div tabIndex="0" className="watch_row watch_row_with_cover _watch_row">
            <div className="watch_row_content _watch_row_content" onMouseOver={ handleMouseOver } onMouseLeave={ handleMouseLeave }>
                <div className="watch_row__cover" style={{backgroundImage: 'url(https://sun9-41.userapi.com/c204620/v204620381/a1a6/QpPJ8bitRHY.jpg)'}}>
                </div>
                <div className={ imageIconClassNames }>
                </div>

                <div className="watch_row__inner">
                    <div className="watch_row__performer_title">
                        <div className="watch_row__performers">
                            <span>Sub Title</span>
                        </div>
                        <div className="watch_row__title _watch_row__title">
                            <Link href="/watch/[id]" as={`/watch/${id}`}>
                                <a>
                                    <span className="watch_row__title_inner _watch_row__title_inner">{ channelName }</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="watch_row__info _watch_row__info">
                        <div className={ durationClassNames }>3:04
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
