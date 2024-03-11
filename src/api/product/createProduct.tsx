import { NextRequest, NextResponse } from 'next/server';

interface Product {
  idProduct: string;
  name: string;
  manufacturer: string;
  price: number;
  description: string;
  guarantyMonths: number;
  stores: Store[];
}

interface Store {
  storeCode: string;
  stock: number;
}

export default async function handler(req: NextRequest, res: NextResponse) {
  // Check request method (should be POST)
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  // Type cast request body to Product
  const body = req.body as unknown as Product;

  // Extract data from typed request body
  const { idProduct,name,manufacturer,price,description,guarantyMonths,stores } = body;

  try {
    const response = await fetch('http://localhost:8080/v1/products/create-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idProduct,name,manufacturer,price,description,guarantyMonths,stores }),
    });

    if (!response.ok) {
      throw new Error(`Error creating the product: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ message: 'Product created successfully', data }, { status: 200 }); // Send any response data
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating the product' }, { status: 500 });
  }
}