import { apiFetch } from "../api";
import { Cookie } from "../../util";
import Router from "next/router";
import {AUTHENTICATE} from "../../redux/types";

export const authenticate = ({ email, password }, type) => {
    if (type !== 'signin' && type !== 'signup') {
        throw new Error('Wrong API call!');
    }

    return (dispatch) => {
        apiFetch('/vktv/auth/signin').then((response) => {
            Cookie.setCookie('token', response.token);
            Router.push('/');
            dispatch({type: AUTHENTICATE, payload: response.token});
        }).catch((error) => {
            throw new Error(err);
        });
    }
};
