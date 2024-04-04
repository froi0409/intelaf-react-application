//@ts-ignore
import { getCookie } from "cookies-next";

export const getCurrentStore = () => {
    return `${getCookie('idStore')}`;
}