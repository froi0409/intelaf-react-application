import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getAllProductsStockByStore(): Promise<any> {
    try {
      const response = await axios.get('/api/sale/stockProducts/', {
        headers: {
          Authorization: getCookieJwt()
        }
      });
      return response.data;
    } catch (error:any) {
      throw new Error(error.response.data.message);
    }
  }