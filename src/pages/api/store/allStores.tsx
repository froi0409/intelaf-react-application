import { NextApiResponse } from "next/types";
import { NextRequest } from 'next/server';
import axios from "axios";


// Maneja las solicitudes GET
export async function handleGet(req: NextRequest, res: NextApiResponse) {

    try {        
        const response  =  await axios.get(`${process.env.URL_API_BACKEND}/v1/store/getAll`)
        const data  = await response.data
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error to get all stores' });
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