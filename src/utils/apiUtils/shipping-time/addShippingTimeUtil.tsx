import axios from 'axios';

export async function addShippingTime(data: any): Promise<any> {
    try {
        console.log('xd');
        const response = await axios.post('/api/shipping-time/addShippingTime', data);
        return response;    
    } catch (error: any) {
        if (error.response) {
            return error.response;
        }
        throw new Error(error.response.data.message);
    }
}
