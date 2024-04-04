import axios from 'axios';
//@ts-ignore
import { getCookieJwt } from 'src/utils/cookieUtils';


export async function getTrakingsOrders(): Promise<any> {
    try {
      const response = await axios.get('/api/order/trakingOrders/', {
        headers: {
            Authorization: getCookieJwt()
        }
    })
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error to get the trakings orders');
    }
  }