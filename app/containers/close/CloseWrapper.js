import { useRef } from 'react';
import PropTypes from 'prop-types';

import useOutsideClick from "./Outside";
import useEscapeClick from "./Escape";

const CloseWrapper = ({ onEscapeOutside, children }) => {
    const closeRef = useRef();

    useOutsideClick(closeRef, onEscapeOutside);
    useEscapeClick(closeRef, onEscapeOutside);

    return (
        <div ref={closeRef}>
            {children}
        </div>
    );
};

CloseWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onEscapeOutside: PropTypes.func.isRequired,
};

export default CloseWrapper;
