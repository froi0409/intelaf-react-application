import axios from "axios";
import { getCookieJwt } from "src/utils/cookieUtils";

export async function verifySystemData(): Promise<any> {
    try {
        const response = await axios.get('/api/data-file/verifySystemData', {
            headers: {
                Authorization: getCookieJwt()
            }
        });
        return response;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        }
        throw new Error('Ocurrió un error al verificar si el sistema tiene datos o no');
    }
}
