import { getCookie } from "cookies-next";

export const getCookieJwt = () => {
    console.log(`cookie jwt: ${getCookie('jwt')}`);
    return `Bearer ${getCookie('jwt')}`;
}