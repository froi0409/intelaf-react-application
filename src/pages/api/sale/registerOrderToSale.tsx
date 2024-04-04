import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";
import { getJwt } from '../jwtUtils';

interface Product {
    productId: string; // Assuming a unique identifier for each product
    quantity: number;
}

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

// Define la interfaz SaleData
interface SaleDataBackend {
    date: Date | undefined | null;
    nit: string;
    total: number;
    payments: PaymentInfo[];
    products: GetProduct[];
    storeCode: string;
    dateEntry: Date;
    estimatedDeliveryDate: Date;
}

export async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body as unknown as SaleDataBackend;
    // // Transforma los datos de venta
    // const transformedSaleData = transformSaleData(body);
    try {
        const response = await axios.post(`${process.env.URL_API_BACKEND}/v1/sale/register-order`, body, {
            headers: {
                Authorization: getJwt(req)
            }
        });
        // Devuelve una respuesta JSON con el mensaje de éxito y los datos de respuesta
        return res.status(response.status).json({ message: 'Venta Registrada satisfactoriamente', data: response.data });
    } catch (error: any) {
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