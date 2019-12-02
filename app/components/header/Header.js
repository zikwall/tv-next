import React from 'react';

const Header = ({ children }) => {
    return (
        <header className="site-header mb-1">
            <div className="master-container-fluid header-inner">
                { children }
            </div>
        </header>
    );
};

export default Header;