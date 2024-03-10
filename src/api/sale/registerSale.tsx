import { NextRequest, NextResponse } from 'next/server';

interface SaleData {
  date: string;
  nit: string; // Assuming nit is a string in your case
  total: number;
}

export default async function handler(req: NextRequest, res: NextResponse) {
  // Check request method (should be POST)
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  // Type cast request body to SaleData
  const body = req.body as unknown as SaleData;

  // Extract data from typed request body
  const { date, nit, total } = body;

  // Implement your logic to register the sale with the backend
  // This is a placeholder for your actual implementation
  try {
    const response = await fetch('http://localhost:8080/v1/sale/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, nit, total }), // Add customer if needed
    });

    if (!response.ok) {
      throw new Error(`Error registering sale: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ message: 'Sale registered successfully', data }, { status: 200 }); // Send any response data
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error registering sale' }, { status: 500 });
  }
}
