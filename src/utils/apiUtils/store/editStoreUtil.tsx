import axios from "axios";
import { getCookieJwt } from "src/utils/cookieUtils";

export async function editStore(data: any): Promise<any> {
    try {
        const response = await axios.put(`/api/store/editStore`, data, {
            headers: {
                Authorization: getCookieJwt()
            }
        });
        return response;
    } catch (error: any) {
        console.error(error);
        if (error.response) {
            return error.response;
        }
        throw new Error(error.message);
    }
}