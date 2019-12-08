import { apiFetch } from "../api";
import { Cookie } from "../../util";
import Router from "next/router";
import { AUTHENTICATE } from "../../redux/types";
import { SESSION_TOKEN_KEY } from "../../constants";

export const authenticate = ({ email, password }, type) => {
    if (type !== 'signin' && type !== 'signup') {
        throw new Error('Wrong API call!');
    }

    return (dispatch) => {
        apiFetch('/vktv/auth/signin').then((response) => {
            Cookie.setCookie(SESSION_TOKEN_KEY, response.token);
            Router.push('/');
            dispatch({type: AUTHENTICATE, token: response.token});
        }).catch((error) => {
            throw new Error(err);
        });
    }
};
