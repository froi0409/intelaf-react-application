// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Styled Component
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";

// Components
import FormInvoiceHeader from "src/components/sales/invoice/FormInvoiceHeader";
import FormInvoiceCustomer from "src/components/sales/invoice/FormInvoiceCustomer";
import FormInvoiceProduct from "src/components/sales/invoice/FormInvoiceProduct";
import SpanningInvoiceTable from "src/components/sales/invoice/SpanningInvoiceTable";

// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";
import { FormInvoicePay } from "src/components/sales/invoice/FormInvoicePay";
import { RegisterSale } from "src/components/sales/invoice/RegisterSale";
import { useState } from "react";
import { SaleData, registerSale } from "src/utils/apiUtils/sale/invoice/registerSale";


export interface Product {
  id_product: string; // Assuming a unique identifier for each product
  name: string;
  stock: number;
  price: number;
}

export interface InvoiceProduct {
  id_product : string; // Assuming a unique identifier for each product
  name: string;
  quantity: number;
  unit_price: number;
  price: number;
}

function priceInvoiceProduct(qty: number, unit: number) {
  return qty * unit;
}

function createInvoiceProduct(id_product: string, name:string, quantity: number, unit_price: number) {
  const price = priceInvoiceProduct(quantity, unit_price);
  return { id_product, name, quantity,unit_price, price };
}

/* dump data */
const dump_products: Product[] = [
  {
    id_product: 'PRD-001',
    name: 'T-Shirt',
    stock: 10,
    price: 15.99,
  },
  {
    id_product: 'PRD-002',
    name: 'Coffee Mug',
    stock: 25,
    price: 7.50,
  },
  {
    id_product: 'PRD-003',
    name: 'Notebook',
    stock: 5,
    price: 9.99,
  },
  // ... add more products
];

const AddInvoice = () => {

  const [date, setDate] = useState<Date | null | undefined>(null)
  const [nit, setNit] = useState<number | string>('');
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProduct[]>([]);
  const [total, setTotal] = useState(0);


  const addProduct = (product: Product, quantity: number) => {
    const existingProductIndex = invoiceProducts.findIndex((p) => p.id_product === product.id_product);

    if (existingProductIndex !== -1) {
      const newProducts = [...invoiceProducts];
      newProducts[existingProductIndex].quantity += quantity;
      newProducts[existingProductIndex].price += priceInvoiceProduct(quantity,newProducts[existingProductIndex].unit_price);
      setInvoiceProducts(newProducts);
    } else {
      const invoiceProduct = createInvoiceProduct(product.id_product,product.name, quantity, product.price);
      setInvoiceProducts([...invoiceProducts, invoiceProduct]);
    }
  }

  const updateDate = (date: Date) => {
    setDate(date);
  }

  const getDate = () => { return date; }

  const reciveNit = (nitRecive: number | string) => {
    setNit(nitRecive);
  }

  const updateTotal = (total: number) => {
    setTotal(total);
  }

  const handleConfirmationRegisterSale = async () => {
    try {
      const saleData: SaleData = {
        date: date, // Si date es undefined o null, asigna una cadena vacía ''
        nit: nit.toString(), // Convierte nit a cadena usando .toString()
        total: total || 0, // Si total es undefined o null, asigna 0
      };

      const data = await registerSale(saleData);
      console.log('Sale registered successfully:', data);
      // Handle success, e.g., display a confirmation message
    } catch (error) {
      console.error('Error registering sale:', error);
      // Handle errors, e.g., display an error message
    }
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <FormInvoiceHeader updateDate={updateDate} getDate={getDate} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormInvoiceCustomer reciveNit={reciveNit} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormInvoiceProduct addProduct={addProduct} products={dump_products} />
        </Grid>
        <Grid item xs={12} md={12}>
          <SpanningInvoiceTable products={invoiceProducts} updateTotal={updateTotal} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormInvoicePay />
        </Grid>
        <Grid item xs={12} md={12}>
          <RegisterSale handleConfirmationRegisterSale={handleConfirmationRegisterSale} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default AddInvoice;
