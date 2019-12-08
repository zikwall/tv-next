import React from "react";
import { connect } from "react-redux";
import { Menu, MenuActiveItem } from "../ui/menu";

const MainMenu =  ({ isAuthenticated }) => {
    return (
        <Menu>
            <MenuActiveItem isActive url="/" >
                Go to Home
            </MenuActiveItem>
            <MenuActiveItem url="/help" >
                Help &amp; Support
            </MenuActiveItem>
            <MenuActiveItem url="/channel" >
                Watch
            </MenuActiveItem>
            <MenuActiveItem url="/login" isVisible={ !isAuthenticated }>
                Login & Register
            </MenuActiveItem>
            <MenuActiveItem url="/privacy" >
                Terms &amp; Privacy
            </MenuActiveItem>
        </Menu>
    );
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps)(MainMenu);
