import { NextApiResponse } from "next/types";
import { NextRequest } from 'next/server';
import axios from "axios";
import { getJwt } from "../jwtUtils";

export async function handleGet(req: NextRequest, res: NextApiResponse) {
    try {
        const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/shippingtime/getAll`, {
            headers: {
                Authorization: getJwt(req)
            }
        });
        return res.status(response.status).json(response.data);
    } catch (error: any) {
        if (error.response) {
            return error.response;
        } else {
            return res.status(501).json({ message: 'Error to get all shipping times' });
        }
    }
}

export default async function handler(req: NextRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
