import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";

export async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Obtén el ID del path
        const { id } = req.query;
        const response  =  await axios.get(`${process.env.URL_API_BACKEND}/v1/order/shippingStore/${id}`)
        const data  = await response.data
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