import axios from 'axios';
//@ts-ignore
import { getCookieJwt } from 'src/utils/cookieUtils';
import { decodeJWT } from 'src/utils/helpers/jwtHelper';


export async function getTrakingsOrders(): Promise<any> {
    try {
      const sub = decodeJWT('sub');
      const response = await axios.get(`/api/order/trakingOrders?sub=${sub}` , {
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