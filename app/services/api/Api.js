import { API_DOMAIN } from "../../constants";

export const apiFetch = (url, options, useAuth = true) => {

    let headers = {
        'Accept': "application/json",
        "Content-Type": "application/json",
    };

    return fetch(apiUrl(url), {
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
