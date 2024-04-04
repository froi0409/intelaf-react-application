import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

interface GetProduct {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

// Define una interfaz para describir la información de pago
interface PaymentInfo {
    type: string;
    amount: number;
}

export interface SaleDataBackend {
    date: Date | string;
    nit: string;
    total: number;
    payments: PaymentInfo[];
    products: GetProduct[];
    storeCode: string;
    dateEntry: Date | string;
    estimatedDeliveryDate: Date | string;
}

export async function registerOrderToSale(saleData: SaleDataBackend): Promise<any> {
    try {
      const response = await axios.post('/api/sale/registerOrderToSale', saleData, {
        headers: {
          Authorization: getCookieJwt()
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error registering sale');
    }
}
  