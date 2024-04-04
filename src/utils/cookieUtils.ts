
import { getCookie } from "cookies-next";

export const getCookieJwt = () => {
    return `Bearer ${getCookie('jwt')}`;
}

export const getCookieJwtGetServerSideProps = (context: any) => {
    return `Bearer ${context.req.cookies['jwt']}`
}