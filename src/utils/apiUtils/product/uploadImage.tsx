import axios from 'axios';
import { getCookieJwt } from 'src/utils/helpers/cookieUtils';
export async function postUploadImageProduct(data:any): Promise<any> {
    const url = 'http://localhost:3000/api/image/uploadImage/'
    try {
      const response = await axios.post(url,data, {
        headers: {
            Authorization: getCookieJwt()
        }
    });
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error creating the product from' + url);
    }
}