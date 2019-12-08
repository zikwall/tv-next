import decode from 'jwt-decode';
import { Cookie } from '../../util';
import { SESSION_TOKEN_KEY } from "../../constants";

export default class Session {
    static isGuest = () => {
        return !Session.isLogged();
    };

    static isLogged = () => {
        const token = Cookie.getCookie(SESSION_TOKEN_KEY);
        return !!token && !Session.isSessionExpired(token);
    };

    static isSessionExpired = (accessToken) => {
        try {
            const decoded = decode(accessToken);

            return (decoded.exp < Date.now() / 1000);
        } catch (err) {
            console.log('Expired token! Logout...');
            return false;
        }
    };

    static flushSession = () => {
        Cookie.removeCookie(SESSION_TOKEN_KEY);
    };
}
