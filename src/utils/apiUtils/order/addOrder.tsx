import axios from 'axios';

import { InvoiceProduct, PaymentInfo } from "../sale/invoice/registerSale";

export interface OrderData {
    nit: string;
    idStoreShipping: string;
    idStoreReceive: string;
    dateDeparture: Date | undefined | null;
    total: number;
    status: string;
    payments: PaymentInfo[]; 
    products: InvoiceProduct[];
  }

  export async function registerOrder(orderData: OrderData): Promise<any> {
    try {
      const response = await axios.post('/api/order/addOrder', orderData);
      return response.data;
    } catch (error) {
      throw new Error('Error registering order');
    }
  }

