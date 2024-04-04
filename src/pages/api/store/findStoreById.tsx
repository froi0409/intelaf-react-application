import { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";
import { getJwt } from "../jwtUtils";

interface RequestData {
    idStore: string;
  }
// Maneja las solicitudes GET
export async function handleGet(req: NextApiRequest, res: NextApiResponse) {

    try {        
        const { idStore } = req.query;
        const response  =  await axios.get(`${process.env.URL_API_BACKEND}/v1/store/${idStore}`, {
            headers: {
                Authorization: getJwt(req)
            }
        });
        return res.status(response.status).json(response.data);
    }catch (err: any) {
        console.error(err);
        if (err.response) {
            return res.status(err.respnse.status).json(err.response.data);
        }
        return res.status(500).json({ message: 'Error to get all customers' });
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