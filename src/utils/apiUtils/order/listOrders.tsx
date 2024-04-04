import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export interface OrdersListStructure {
    idOrder : number;
    idStoreShipping: string;
    idStoreReceive : string;
    dateDeparture : Date;
    dateEntry : Date;
    estimatedDeliveryDate : Date;
    total : number;
    status : string;
}

export async function getListReceiveStore(id: string): Promise<any> {
    try {
        const response = await axios.get(`/api/order/listReceiveStore?id=${id}`, {
            headers: {
              Authorization: getCookieJwt()
            }
          });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error to get orders');
    }
}

export async function getListShippingOrders(id: string): Promise<any> {
    try {
        const response = await axios.get(`/api/order/listShippingOrders?id=${id}`, {
            headers: {
              Authorization: getCookieJwt()
            }
          });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error to get orders');
    }
}