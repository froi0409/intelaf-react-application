import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";
import { getJwt } from '../jwtUtils';

interface StatusOrderDateData {
    idOrder: number;
    status: string;
    dateEntry : Date | null;
}

export async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = req.body as unknown as StatusOrderDateData;
        const response  =  await axios.put(`${process.env.URL_API_BACKEND}/v1/order/updateStatus`, body, {
            headers: {
                Authorization: getJwt(req)
            }
        });
        const data  = await response.data
        return res.status(response.status).json({ message: response.data.status, data: response.data });
    }catch (err: any) {
        return res.status(err.response.status).json({ message: err.response.data });
    } 
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        return handlePut(req, res);
    } else {
        // Si es otro método de solicitud, devuelve un error de método no permitido
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}