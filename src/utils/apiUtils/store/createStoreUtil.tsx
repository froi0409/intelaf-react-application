import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function createStore(data: any): Promise<any> {
    try {
        const response = await axios.post('/api/store/createStore', data, {
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
