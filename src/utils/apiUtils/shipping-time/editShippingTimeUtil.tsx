import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function editShippingTime(data: any): Promise<any> {
    try {
        const response = await axios.put('/api/shipping-time/editShippingTime', data, {
            headers: {
                Authorization: getCookieJwt()
            }
        });
        return response;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        }
        throw new Error(error.response.data.message);
    }
}
