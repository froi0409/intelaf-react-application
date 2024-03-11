import axios from 'axios';
import { NextRequest } from 'next/server';
import { NextApiResponse } from "next/types";

// Define la interfaz SaleData
interface SaleData {
  date: Date | undefined | null;
  nit: string;
  total: number;
}

// Maneja las solicitudes GET
export function handleGet(req: NextRequest, res: NextApiResponse) {
  return res.status(200).json({ message: 'It worked!!1' });
}

// Maneja las solicitudes POST
export async function handlePost(req: NextRequest, res: NextApiResponse) {
  // Convierte el cuerpo de la solicitud a SaleData
  const body = req.body as unknown as SaleData;

  // Extrae los datos del cuerpo de la solicitud
  const { date, nit, total } = body;

  // Implementa la lógica para registrar la venta en el backend
  try {
    // Realiza una solicitud POST a la ruta de registro de ventas en el backend
    const response = await axios.post(`${process.env.URL_API_BACKEND}/v1/sale/register`, {
      date,
      nit,
      total,
    });

    // Devuelve una respuesta JSON con el mensaje de éxito y los datos de respuesta
    return res.status(200).json({ message: 'Sale registered successfully', data: response.data });
  } catch (error) {
    // Maneja cualquier error y devuelve una respuesta de error
    console.error(error);
    return res.status(500).json({ message: 'Error registering sale' });
  }
}

// Exporta la función de manejo de solicitudes HTTP
export default async function handler(req: NextRequest, res: NextApiResponse) {
  // Verifica el método de solicitud
  if (req.method === 'GET') {
    // Si es una solicitud GET, maneja la respuesta
    return handleGet(req, res);
  } else if (req.method === 'POST') {
    // Si es una solicitud POST, maneja la lógica de registro de venta
    return handlePost(req, res);
  } else {
    // Si es otro método de solicitud, devuelve un error de método no permitido
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
