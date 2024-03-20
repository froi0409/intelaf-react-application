import axios from 'axios';

export async function autocompleteFieldscustomer(nit: string,): Promise<any> {
    try {
      const response = await axios.get(`/api/customer/autocompleteByNit/?id=${nit}`);
      return response.data;
    } catch (error) {
      throw new Error('Error to find customer');
    }
  }