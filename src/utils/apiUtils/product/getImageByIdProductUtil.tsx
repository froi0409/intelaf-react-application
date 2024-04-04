import axios from 'axios';
import { getCookieJwt } from 'src/utils/helpers/cookieUtils';
export async function getAllProducts(): Promise<any> {
    const url = 'http://localhost:3000/api/product/allProducts'
    try {      
      const response = await axios.get(url, {
        headers: {
            Authorization: getCookieJwt()
        }
    });
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error to get all products from the path domain');
    }
}