import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function autocompleteFieldscustomer(nit: string,): Promise<any> {
    try {
      const response = await axios.get(`/api/customer/autocompleteByNit/?id=${nit}`, {
        headers: {
          Authorization: getCookieJwt()
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error to find customer');
    }
  }