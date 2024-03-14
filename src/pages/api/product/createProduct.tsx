import { NextApiResponse } from "next/types";
import { NextRequest } from 'next/server';
import axios from "axios";


// Maneja las solicitudes POST
export async function handlePost(req: NextRequest, res: NextApiResponse) {

    try {        
        const requestData = req.body;
        const response  =  await axios.post(`${process.env.URL_API_BACKEND}/v1/products/create-product`,requestData) 
        const data  = await response.data
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating the product' });
    }    
}  

export default async function handler(req: NextRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return handlePost(req, res);
    } else {
        // Si es otro método de solicitud, devuelve un error de método no permitido
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
}