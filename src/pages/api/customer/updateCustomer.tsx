import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";
import { getJwt } from '../jwtUtils';

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

export async function handlePut (req: NextApiRequest, res: NextApiResponse) {

    try {
        // Convierte el cuerpo de la solicitud a SaleData
       const body = req.body as unknown as FormCustomer;

       // Extrae los datos del cuerpo de la solicitud
       const {nit, name, phone, dpi, email, address, password, username, credit} = body;
        
        // Hacer la solicitud POST
       const response = await axios.put(`${process.env.URL_API_BACKEND}/v1/customer/update`, {
           nit, 
           name, 
           phone, 
           dpi, 
           email, 
           address, 
           password, 
           username,
           credit
       }, {
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
    if (req.method === 'PUT') {
        return handlePut(req, res);
    } else {
        // Si es otro método de solicitud, devuelve un error de método no permitido
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
}