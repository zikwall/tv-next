import { API_DOMAIN } from "../../constants";
import { Session } from '../../services/auth';
import { Cookie } from "../../util";
import { SESSION_TOKEN_KEY } from "../../constants";

export const apiFetch = (url, options, useAuth = true) => {
    let headers = {};

    if (!Session.isGuest()) {
        headers = {...headers, ...{"Authorization": getAuthorizationHeader()}}
    }

    return pureFetch(apiUrl(url), options, headers);
};

export const pureFetch = (url, options, headers) => {
    headers = {...headers, ...{
            'Accept': "application/json",
            "Content-Type": "application/json",
        }};

    return fetch(url, {
        headers: headers,
        ...options
    })
        .then(handleResponse)
        .then(response => response.json());
};

const handleResponse = (response) => {
    return response;
};

export const apiUrl = (url) => {
    return API_DOMAIN + url;
};

const getAuthorizationHeader = () => {
    return 'Bearer ' + Cookie.getCookie(SESSION_TOKEN_KEY);
};
