import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export interface StatusOrderDateData {
    idOrder: number;
    status: string;
    dateEntry : Date | null | string;
}

export async function updateStatusOrder(formData: StatusOrderDateData): Promise<any> {
    try {
        const response = await axios.put('/api/order/updateOrderStatus/', formData, {
            headers: {
              Authorization: getCookieJwt()
            }
          });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}