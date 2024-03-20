import { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";

interface RequestData {
    username: string;
  }
// Maneja las solicitudes GET
export async function handleGet(req: NextApiRequest, res: NextApiResponse) {

    try {        
        const { username } = req.query;
        const response  =  await axios.get(`${process.env.URL_API_BACKEND}/v1/employee/employee-by-username/${username}`)
        const data  = await response.data
        return res.status(200).json(data);
    }catch (err) {
        console.error(err);
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