import { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";
import { error } from "console";
import { getJwt } from "../jwtUtils";
import { setCookie } from 'cookies-next';

interface RequestData {
    idStore: string;
  }
// Maneja las solicitudes GET
export async function handleGet(req: NextApiRequest, res: NextApiResponse) {

    try {        
        const { idStore: idStore } = req.query;
        const response  =  await axios.get(`${process.env.URL_API_BACKEND}/v1/store/${idStore}`, {
            headers: {
                Authorization: getJwt(req)
            }
        });

        setCookie('idStore', idStore);
        console.log('Cookie idStore Setteada', idStore);

        return res.status(response.status).json(response.data);
    }catch (err: any) {
        console.error(err);
        if (err.response) {
            return res.status(err.response.status).json(err.response.data);
        }
        return res.status(500).json({ message: 'Error to get the product' });
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