import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";
import { getJwt } from '../jwtUtils';


export interface Stock_Store {
    storeCode: string;
    stock: number
}

export interface Products_Stock {
    idProduct: string;
    name: string;
    manufacturer: string;
    price: number;
    description: string;
    guarantyMonths : string;
    stores: Stock_Store[];
}


export async function handleGet (req: NextApiRequest, res: NextApiResponse) {

    try {
        const response  =  await axios.get(`${process.env.URL_API_BACKEND}/v1/products/get-all-products-stock`, {
            headers: {
                Authorization: getJwt(req)
            }
        });
        const data  = await response.data
        // const products = data as unknown as products_stock;
        return res.status(response.status).json(data);
    }catch (err: any) {
        return res.status(err.response.status).json({ message: err.response.data });
    } 
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else {
        // Si es otro método de solicitud, devuelve un error de método no permitido
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
}