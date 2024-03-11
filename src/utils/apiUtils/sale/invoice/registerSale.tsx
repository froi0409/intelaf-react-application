import axios from 'axios';

export interface SaleData {
  date: Date | undefined | null;
  nit: string;
  total: number;
}

export async function registerSale(saleData: SaleData): Promise<any> {
  try {
    const response = await axios.post('/api/sale/registerSale', saleData);
    return response.data;
  } catch (error) {
    throw new Error('Error registering sale');
  }
}

