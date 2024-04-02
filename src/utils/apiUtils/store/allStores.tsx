import axios from 'axios';
import { getCookie } from "cookies-next";

export async function getAllStores(): Promise<any> {
    try {

        const jwt = getCookie('jwt');

        console.log(`getAllStores JWT: ${getCookie('jwt')}`);

        const response = await axios.get('/api/store/allStores', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error to get all stores')
    }
}
