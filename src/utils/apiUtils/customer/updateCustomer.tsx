import axios from 'axios';
import { FormCustomer } from 'src/pages/customers/register-customer';

export async function updateCustomer(formData: FormCustomer): Promise<any> {
    try {
        const response = await axios.put('/api/customer/updateCustomer/', formData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}