import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";
import { getJwt } from '../jwtUtils';

export async function handleGet (req: NextApiRequest, res: NextApiResponse) {
    try {
         // Obtén el ID del path
         const { id } = req.query;
        
         // Hacer la solicitud GET con el ID
         const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/customer/findById/${id}`, {
            headers: {
                Authorization: getJwt(req)
            }
         });
         const data  = await response.data
         return res.status(response.status).json(data);
    }catch (error: any) {
        return res.status(error.response.status).json(error.response.data);
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