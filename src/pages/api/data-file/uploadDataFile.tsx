import axios from "axios";
import { NextApiResponse } from "next/types";
import { NextRequest } from "next/server";

export async function handlePost(req: NextRequest, res: NextApiResponse) {
    try {
        const requestData = req.body;   
        console.log('Data');
        console.log(requestData);
        const response = await axios.post(`${process.env.URL_API_BACKEND}/v1/datafile`, requestData);
        return res.status(response.status).json(response.data);
    } catch (error: any) {
        console.error(error);
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(409).json({ message: error });
        }
    }
}

export default async function handler(req: NextRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return handlePost(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
