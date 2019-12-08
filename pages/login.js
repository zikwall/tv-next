import { useEffect } from 'react';
import { connect } from "react-redux";
import Router from "next/router";
import { Initialize } from "../app/services/auth";

const Login = ({ isAuthenticated }) => {
    useEffect(() => {
        if (isAuthenticated) {
            Router.push('/');
        }

        return () => {}
    });

    return (
        <>
            Hello
        </>
    );
};

Login.getInitialProps = (ctx) => {
    Initialize(ctx);
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps)(Login);
