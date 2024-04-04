import axios from "axios";
import { getCookieJwt } from "src/utils/cookieUtils";

export async function uploadDataFile(data: any): Promise<any> {
    try {
        console.log("DATA UTIL");
        console.log(data);
        const response = await axios.post(`http://localhost:8080/v1/datafile`, data, {
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