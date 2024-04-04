import axios from 'axios';
import { getCookieJwt } from 'src/utils/helpers/cookieUtils';
export async function postCreateEmployeePath(path: string,data:any): Promise<any> {
    try {
      const url = 'http://' + path + '/api/user/createEmployee/'
      const response = await axios.post(url,data, {
        headers: {
            Authorization: getCookieJwt()
        }
    });
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error to get all employees from the path domain');
    }
}