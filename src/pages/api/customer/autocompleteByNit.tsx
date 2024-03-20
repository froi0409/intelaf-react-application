import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";

export async function handleGet (req: NextApiRequest, res: NextApiResponse) {
    try {
         // Obtén el ID del path
         const { id } = req.query;
        
         // Hacer la solicitud GET con el ID
         const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/customer/findById/${id}`);
        const data  = await response.data
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        return res.status(404).json({ message: 'Error to get the customer by nit' });
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