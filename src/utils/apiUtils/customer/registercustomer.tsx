import axios from 'axios';
import { FormCustomer } from 'src/pages/customers/register-customer';

export async function registerCustomer(formData: FormCustomer): Promise<any> {
    try {
        const response = await axios.post('/api/customer/registerCustomer/', formData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}