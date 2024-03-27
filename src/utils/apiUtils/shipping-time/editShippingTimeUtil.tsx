import axios from 'axios';

export async function editShippingTime(data: any): Promise<any> {
    try {
        const response = await axios.put('/api/shipping-time/editShippingTime', data);
        return response;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        }
        throw new Error(error.response.data.message);
    }
}
