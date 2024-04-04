import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function addShippingTime(data: any): Promise<any> {
    try {
        const response = await axios.post('/api/shipping-time/addShippingTime', data, {
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
