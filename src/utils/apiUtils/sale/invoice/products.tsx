import axios from 'axios';

export async function getAllProductsStockByStore(): Promise<any> {
    try {
      const response = await axios.get('/api/sale/stockProducts/');
      return response.data;
    } catch (error:any) {
      throw new Error(error.response.data.message);
    }
  }