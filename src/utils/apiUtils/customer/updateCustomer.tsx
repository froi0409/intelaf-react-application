import axios from 'axios';
import { FormCustomer } from 'src/pages/customers/register-customer';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function updateCustomer(formData: FormCustomer): Promise<any> {
    try {
        const response = await axios.put('/api/customer/updateCustomer/', formData, {
            headers: {
                Authorization: getCookieJwt()
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}