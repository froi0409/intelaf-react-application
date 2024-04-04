import { NextApiResponse } from "next/types";
import { NextRequest } from 'next/server';
//@ts-ignore
import { getJwt } from "../jwtUtils";
import axios from "axios";


export interface CustomerData {
    userIdUser: number;
    credit: number,
    nit: string,
    name: string,
    phone: string,
    dpi: string,
    email: string,
    address: string
}

// Maneja las solicitudes GET
export async function handleGet(req: NextRequest, res: NextApiResponse) {

    try {
        const response  =  await axios.get(`${process.env.URL_API_BACKEND}/v1/customer/all`
        , {
            headers: {
                Authorization: getJwt(req)
            }
        });
        const data  = await response.data
        return res.status(response.status).json(data);
    }catch (error : any) {
        return res.status(error.response.status).json(error.response.data);
    }    
}  

export default async function handler(req: NextRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else {
        // Si es otro método de solicitud, devuelve un error de método no permitido
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
}