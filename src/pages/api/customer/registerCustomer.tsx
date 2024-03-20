import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";

interface FormCustomer {
    nit: string;
    name: string;
    phone: string;
    dpi: string;
    email: string;
    address: string;
    password: string;
    username: string;
    credit: number;
  }

export async function handlePost (req: NextApiRequest, res: NextApiResponse) {
    try {
         // Convierte el cuerpo de la solicitud a SaleData
        const body = req.body as unknown as FormCustomer;

        // Extrae los datos del cuerpo de la solicitud
        const {nit, name, phone, dpi, email, address, password, username, credit} = body;
         
         // Hacer la solicitud POST
        const response = await axios.post(`${process.env.URL_API_BACKEND}/v1/customer/create`, {
            nit, 
            name, 
            phone, 
            dpi, 
            email, 
            address, 
            password, 
            username,
            credit
        });
        const data  = await response.data
        return res.status(201).json(data);
    }catch (err: any) {
        // console.error(err.response.status, err.response.data);
        return res.status(err.response.status).json({ message: err.response.data });
    }  
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return handlePost(req, res);
    } else {
        // Si es otro método de solicitud, devuelve un error de método no permitido
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
}