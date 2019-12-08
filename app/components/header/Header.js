import React from 'react';
import { connect } from 'react-redux';
import { authenticate, reauthenticate, deauthenticate } from '../../redux/actions';

const Header = ({ children, isAuthenticated, deauthenticate }) => {
    return (
        <header className="site-header mb-1">
            <div className="master-container-fluid header-inner">
                { children }
            </div>
        </header>
    );
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps, { authenticate, reauthenticate, deauthenticate })(Header);
