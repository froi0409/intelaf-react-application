import axios from "axios";
import { getCookieJwt } from "src/utils/cookieUtils";

export async function findStoreById(data: any): Promise<any> {
    try {
        const response = await axios.get(`/api/store/findStoreById?idStore=${data}`, {
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