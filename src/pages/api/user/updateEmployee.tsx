import { NextApiResponse } from "next/types";
import { NextRequest } from 'next/server';
import axios from "axios";


// Maneja las solicitudes PUT
export async function handlePut(req: NextRequest, res: NextApiResponse) {

    try {          
        const requestData = req.body;
        const username = requestData.username;
        const response  =  await axios.put(`${process.env.URL_API_BACKEND}/v1/employee/update-employee/${username}`,requestData)
        const data  = await response.data
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating the employee' });
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