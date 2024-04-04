import { NextApiResponse } from "next/types";
import { NextRequest } from "next/server";
import axios from "axios";

export async function handlePut(req: NextRequest, res: NextApiResponse) {
    try {
        const requestData = req.body;
        const response = await axios.put(`${process.env.URL_API_BACKEND}/v1/shippingtime`, requestData);
        return res.status(response.status).json(response.data);
    } catch (error: any) {
        console.error(error);
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(409).json({ message: error })
        }
    }
}

export default async function handler(req: NextRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        return handlePut(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
