import axios from 'axios';
import { FormCustomer } from 'src/pages/customers/register-customer';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function registerCustomer(formData: FormCustomer): Promise<any> {
    try {
        const response = await axios.post('/api/customer/registerCustomer/', formData, {
            headers: {
              Authorization: getCookieJwt()
            }
          });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}