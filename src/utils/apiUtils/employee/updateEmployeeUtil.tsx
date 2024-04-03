import axios from 'axios';
import { getCookieJwt } from 'src/utils/helpers/cookieUtils';
export async function putUpdateEmployee(data:any): Promise<any> {
    const url ='http://localhost:3000/api/user/updateEmployee/'
    try {      
      const response = await axios.put(url,data, {
        headers: {
            Authorization: getCookieJwt()
        }
    });
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error updating the employee from' + url);
    }
}