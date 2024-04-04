import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export interface InvoiceProduct {
  id_product : string; // Assuming a unique identifier for each product
  name: string;
  quantity: number;
  unit_price: number;
  price: number;
}

// Define una interfaz para describir la información de pago
export interface PaymentInfo {
  type: string;
  amount: number;
}

export interface SaleData {
  date: Date | undefined | null;
  nit: string;
  total: number;
  payments: PaymentInfo[]; 
  products: InvoiceProduct[];
  storeCode : string;
}

export async function registerSale(saleData: SaleData): Promise<any> {
  try {
    const response = await axios.post('/api/sale/registerSale', saleData, {
      headers: {
        Authorization: getCookieJwt()
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error registering sale');
  }
}

