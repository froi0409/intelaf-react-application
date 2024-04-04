import axios from 'axios';
import { verify } from 'crypto';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getAllShippingTimes(): Promise<any> {
    try {
        const response = await axios.get('/api/shipping-time/allShippingTimes', {
            headers: {
                Authorization: getCookieJwt()
            }
        });
        return response;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        }
        throw new Error(`Error to get all shipping times: ${error}`)
    }
}
