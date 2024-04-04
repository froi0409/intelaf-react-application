import axios from 'axios';
import { NextRequest } from 'next/server';
import { NextApiResponse } from "next/types";
import { InvoiceProduct, SaleData } from 'src/utils/apiUtils/sale/invoice/registerSale';
import { getJwt } from '../jwtUtils';


 interface Product {
  productId : string; // Assuming a unique identifier for each product
  quantity: number;
}

// Define una interfaz para describir la información de pago
 interface PaymentInfo {
  type: string;
  amount: number;
}

// Define la interfaz SaleData
interface SaleDataBackend {
  date: Date | undefined | null;
  nit: string;
  total: number;
  payments: PaymentInfo[];
  products: Product[];
  storeCode : string;
}

// Función para transformar InvoiceProduct a Product
function transformInvoiceProduct(product: InvoiceProduct): Product {
  return {
    productId: product.id_product,
    quantity: product.quantity
  };
}

// Función para transformar SaleData
function transformSaleData(saleData: SaleData): SaleDataBackend {
  const transformedProducts = saleData.products.map(transformInvoiceProduct);
  return {
    date: saleData.date,
    nit: saleData.nit,
    total: saleData.total,
    payments: saleData.payments,
    products: transformedProducts,
    storeCode : saleData.storeCode
  };
}


// Maneja las solicitudes GET
export function handleGet(req: NextRequest, res: NextApiResponse) {
  return res.status(200).json({ message: 'It worked!!1' });
}

// Maneja las solicitudes POST
export async function handlePost(req: NextRequest, res: NextApiResponse) {
  // Convierte el cuerpo de la solicitud a SaleData
  const body = req.body as unknown as SaleData;

  // Transforma los datos de venta
  const transformedSaleData = transformSaleData(body);

  // // Extrae los datos del cuerpo de la solicitud
  // const { date, nit, total,payments,products } = body;

  // Implementa la lógica para registrar la venta en el backend
  try {
    // Realiza una solicitud POST a la ruta de registro de ventas en el backend
    // const response = await axios.post(`${process.env.URL_API_BACKEND}/v1/sale/register`, {
    //   date,
    //   nit,
    //   total,
    //   payments,
    //   products
    // });

    const response = await axios.post(`${process.env.URL_API_BACKEND}/v1/sale/register`, transformedSaleData, {
      headers: {
          Authorization: getJwt(req)
      }
  });

    // Devuelve una respuesta JSON con el mensaje de éxito y los datos de respuesta
    return res.status(response.status).json({ message: 'Venta Registrada satisfactoriamente', data: response.data });
  } catch (error: any) {
    // Maneja cualquier error y devuelve una respuesta de error
    return res.status(error.response.status).json({ message: error.response.data });
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
