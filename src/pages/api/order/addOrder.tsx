import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";
import { OrderData } from 'src/utils/apiUtils/order/addOrder';
import { InvoiceProduct } from 'src/utils/apiUtils/sale/invoice/registerSale';
import { getJwt } from '../jwtUtils';

interface Product {
    productId: string; // Assuming a unique identifier for each product
    quantity: number;
}

// Define una interfaz para describir la información de pago
interface PaymentInfo {
    type: string;
    amount: number;
}

// Define la interfaz SaleData
interface OrderDataBackend {
    nit: string;
    idStoreShipping: string;
    idStoreReceive: string;
    dateDeparture: Date | undefined | null;
    total: number;
    status: string;
    payments: PaymentInfo[];
    products: Product[];
}

// Función para transformar InvoiceProduct a Product
function transformInvoiceProduct(product: InvoiceProduct): Product {
    return {
        productId: product.id_product,
        quantity: product.quantity
    };
}

function transformSaleData(orderData: OrderData): OrderDataBackend {
    const transformedProducts = orderData.products.map(transformInvoiceProduct);
    return {
        nit: orderData.nit,
        idStoreShipping : orderData.idStoreShipping,
        idStoreReceive : orderData.idStoreReceive,
        dateDeparture: orderData.dateDeparture,
        total: orderData.total,
        status : orderData.status,
        payments: orderData.payments,
        products: transformedProducts
    };
}

export async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body as unknown as OrderData;
    const transformedSaleData = transformSaleData(body);
    try {
        const response = await axios.post(`${process.env.URL_API_BACKEND}/v1/order/create-order`, transformedSaleData, {
            headers: {
                Authorization: getJwt(req)
            }
        });
        return res.status(response.status).json({ message: 'Orden Realizdo correctamente', data: response.data });
    } catch (error : any) {
        return res.status(error.response.status).json({ message: error.response.data });
    }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return handlePost(req, res);
    } else {
        // Si es otro método de solicitud, devuelve un error de método no permitido
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}