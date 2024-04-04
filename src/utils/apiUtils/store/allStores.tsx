import axios from 'axios';
//@ts-ignore
import { getCookie } from "cookies-next";
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getAllStores(): Promise<any> {
    try {
        const response = await axios.get('/api/store/allStores', {
            headers: {
                Authorization: getCookieJwt()
            }
        })
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error to get all stores')
    }
}
