
import { getCookie } from "cookies-next";

export const getCookieJwt = () => {
    return `Bearer ${getCookie('jwt')}`;
}