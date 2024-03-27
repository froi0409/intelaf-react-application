import { NextApiResponse } from "next/types";
import { NextRequest } from 'next/server';
import axios from "axios";

export interface StoreData {
    idStore: string,
    name: string,
    address: string,
    email: string,
    phone1: string,
    phone2: string,
    openingHour: string,
    closingHour: string
}

export async function handleGet(req: NextRequest, res: NextApiResponse) {
    try {
        const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/store/getAll`);
        const data = await response.data;
        return res.status(response.status).json(data);
    } catch (error) {
        console.error(error);
        return res.status(501).json({ message: 'Error to get all stores' });
    }
}

export default async function handler(req: NextRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
