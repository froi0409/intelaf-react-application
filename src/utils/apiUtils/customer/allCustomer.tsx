import axios from 'axios';
export async function getAllCustomer(): Promise<any> {
    try {
      const response = await axios.get('/api/customer/allCustomers/');
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error to get all customers');
    }
  }


  export async function getAllCustomerPath(path: string): Promise<any> {
    try {
      const url = 'http://' + path + '/api/customer/allCustomers/'
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
        console.log(error);
      throw new Error('Error to get all customers from the path domain');
    }
  }