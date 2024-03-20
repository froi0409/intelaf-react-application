import { NextApiResponse } from "next/types";
import { NextRequest } from 'next/server';
import axios from "axios";


// Maneja las solicitudes PUT
export async function handlePut(req: NextRequest, res: NextApiResponse) {

    try {
        const requestData = req.body;        
        if (!requestData) {
          return res.status(400).json({ message: 'Request data is missing or invalid' });
        }
        const idProduct = requestData.idProduct;
    
        const response = await axios.put(`${process.env.URL_API_BACKEND}/v1/products/update-product/${idProduct}`, requestData);
        const data = await response.data;
    
        return res.status(200).json(data);
      } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Error update the product' });
      }   
}  

export default async function handler(req: NextRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        return handlePut(req, res);
    } else {
        // Si es otro método de solicitud, devuelve un error de método no permitido
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
}