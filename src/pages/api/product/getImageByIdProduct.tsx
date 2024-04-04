import { NextApiResponse,NextApiRequest } from "next/types";
import axios from "axios";
import { getJwt } from "../jwtUtils";


export async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {        
        const { idProduct } = req.query;        
        const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/images/image-by-idProduct/${idProduct}`, {
            responseType: 'blob', // Indica que la respuesta es una imagen
        
            headers: {
                Authorization: getJwt(req)
            }
        
          });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        return res.status(200).json(imageUrl);
    }catch (err : any) {
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
