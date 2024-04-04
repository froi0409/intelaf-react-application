import { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";
import { getJwt } from "../jwtUtils";

interface RequestData {
    idProduct: string;
  }
// Maneja las solicitudes GET
export async function handleGet(req: NextApiRequest, res: NextApiResponse) {

    try {        
        const { idProduct } = req.query;
        const response  =  await axios.get(`${process.env.URL_API_BACKEND}/v1/products/get-product-by-id/${idProduct}`, {
            headers: {
                Authorization: getJwt(req)
            }
        })
        const data  = await response.data
        return res.status(200).json(data);
    } catch (err : any) {
        console.error(err);
        return res.status(err.response.status).json(err.response.data);
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