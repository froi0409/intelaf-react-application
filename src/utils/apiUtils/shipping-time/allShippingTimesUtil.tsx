import axios from 'axios';
import { verify } from 'crypto';

export async function getAllShippingTimes(): Promise<any> {
    try {
        const response = await axios.get('/api/shipping-time/allShippingTimes');
        return response;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        }
        throw new Error(`Error to get all shipping times: ${error}`)
    }
}
