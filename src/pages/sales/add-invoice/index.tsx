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
import { useEffect, useState } from "react";
import { InvoiceProduct, PaymentInfo, SaleData, registerSale } from "src/utils/apiUtils/sale/invoice/registerSale";
import { Products_Stock } from "src/pages/api/sale/stockProducts";
import { getAllProductsStockByStore } from "src/utils/apiUtils/sale/invoice/products";
import { errorNotification, successNotification } from "src/utils/helpers/notification";
import TableInvoicePayments from "src/components/sales/invoice/TableInvoicePayments";
import { getCurrentStore } from "src/utils/helpers/cookieStore";


export function priceInvoiceProduct(qty: number, unit: number) {
  return qty * unit;
}

export function createInvoiceProduct(id_product: string, name:string, quantity: number, unit_price: number) {
  const price = priceInvoiceProduct(quantity, unit_price);
  return { id_product, name, quantity,unit_price, price };
}

const AddInvoice = () => {

  const store = getCurrentStore();
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [nit, setNit] = useState<string>('');
  const [credits, setcredits] = useState<number>(0);
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProduct[]>([]);
  const [products, setProducts] = useState<Products_Stock[]>([]);
  const [payments, setPayments] = useState<PaymentInfo[]>([]);
  const [stillPay, setStillPay] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    try {
      const data = await getAllProductsStockByStore();
      // const products = data as unknown as products_stock;
      setProducts(data);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect( () => {
    fetchProducts();
  }, [])

  const ClearData =() => {
    setNit('')
    setcredits(0)
    setInvoiceProducts([])
    setProducts([])
    setPayments([])
    setStillPay(0);
    setTotal(0);
    fetchProducts();
  }


  const addProduct = (product: Products_Stock, quantity: number, maxStock: number) => {
    const existingProductIndex = invoiceProducts.findIndex((p) => p.id_product === product.idProduct);
  
    // Verificar si la cantidad agregada supera el stock máximo
    if (existingProductIndex !== -1) {
      const newProducts = [...invoiceProducts];
      const updatedQuantity = newProducts[existingProductIndex].quantity + quantity;
      if (updatedQuantity > maxStock) {
        errorNotification('La cantidad de producto excede el máximo de existencias')
        return;
      }
      newProducts[existingProductIndex].quantity = updatedQuantity;
      newProducts[existingProductIndex].price += priceInvoiceProduct(quantity, newProducts[existingProductIndex].unit_price);
      setInvoiceProducts(newProducts);
    } else {
      // Si el producto no existe en la factura, verificar si la cantidad a agregar supera el stock máximo
      if (quantity > maxStock) {
        // Si la cantidad excede el stock máximo, mostrar un mensaje o manejar el caso según sea necesario
        errorNotification('La cantidad excede el máximo de existencias')
        return;
      }
      const invoiceProduct = createInvoiceProduct(product.idProduct, product.name, quantity, product.price);
      setInvoiceProducts([...invoiceProducts, invoiceProduct]);
    }
  }
  

  const updateDate = (date: Date) => {
    setDate(date);
  }

  const getDate = () => { return date; }

  const reciveNit = (nitRecive: string) => {
    setNit(nitRecive);
  }

  const getcredits = (creditRecive: number) => {
    setcredits(creditRecive);
  }

  const addPayment = (selectedPayment: string, paymentAmount: number) => {
    // Verifica si se ha seleccionado un tipo de pago y se ha ingresado una cantidad
    if (selectedPayment && paymentAmount > 0) {
      paymentAmount = Number(paymentAmount)
      // Agrega el nuevo método de pago al estado
      // Calcula la suma de los montos de los pagos actuales
      const currentTotalPayments:number = payments.reduce((acc, payment) => Number(acc) + payment.amount, 0);
      const futureCurrentTotalPayments = (Number(currentTotalPayments) + paymentAmount)
      // Verifica que la suma de los montos de los pagos no sea mayor al total de la factura
      if ( futureCurrentTotalPayments > total) {
        errorNotification('La suma de los montos de los pagos excede el total de la factura.');
        return false;
      }
      // que la suma de los creditos no sea mayor al credito tenido
      // Verifica que la suma de los montos de los créditos no sea mayor al crédito disponible
    if (selectedPayment === 'Credit') {
      const currentTotalCredits = payments
        .filter(payment => payment.type === 'Credit')
        .reduce((acc, payment) => acc + payment.amount, 0);
      if (currentTotalCredits + paymentAmount > credits) {
        errorNotification('La suma de los montos de los créditos excede el crédito disponible.');
        return false;
      }
    }
      const leftPay = total - futureCurrentTotalPayments;
      setStillPay(Number(leftPay))
      setPayments([...payments, { type: selectedPayment, amount: Number(paymentAmount) }]);
      return true;
    }
    return false;
  };

  const updateTotal = (total: number) => {
    const currentTotalPayments:number = payments.reduce((acc, payment) => Number(acc) + payment.amount, 0);
    const leftPay = total - currentTotalPayments;
    setStillPay(Number(leftPay))
    setTotal(total);
  }

  const isValid = () => {
    // Verifica si Nit no es una cadena vacía
    if (nit === '') {
      return false;
    }
    
    // Verifica si total no es igual a cero
    if (total === 0) {
      return false;
    }
  
    // Verifica si stillPay es igual a cero
    if (stillPay !== 0) {
      return false;
    }
  
    return true;
  };
  const handleCancelSale = () => {
    ClearData();
  }
  const handleConfirmationRegisterSale = async () => {
    //Validations first, Nit, total <> 0, stillPay == 0
    if (!isValid()) {
      errorNotification('Revise todos los campos antes de continuar')
      return
    }

    try {
      const saleData: SaleData = {
        date: date, // Si date es undefined o null, asigna una cadena vacía ''
        nit: nit.toString(), // Convierte nit a cadena usando .toString()
        total: total || 0, // Si total es undefined o null, asigna 0
        payments: payments,
        products : invoiceProducts,
        storeCode : store
      };

      // console.log(saleData, invoiceProducts, payments)

      const data = await registerSale(saleData);
      console.log('Sale registered successfully:', data);
      successNotification('Venta Registrada satisfactoriamente')
      ClearData();
      // Handle success, e.g., display a confirmation message
    } catch (error) {
      errorNotification('Error registering sale');
      // Handle errors, e.g., display an error message
    }
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <FormInvoiceHeader updateDate={updateDate} getDate={getDate} store={store} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormInvoiceCustomer nit={nit} reciveNit={reciveNit} getcredits={getcredits} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormInvoiceProduct addProduct={addProduct} products={products} store={store} />
        </Grid>
        <Grid item xs={12} md={12}>
          <SpanningInvoiceTable products={invoiceProducts} updateTotal={updateTotal} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormInvoicePay credits={credits} addPayment={addPayment} stillPay={stillPay} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TableInvoicePayments payments={payments} />
        </Grid>
        <Grid item xs={12} md={12}>
          <RegisterSale handleConfirmationRegisterSale={handleConfirmationRegisterSale} handleCancelSale={handleCancelSale} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
AddInvoice.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default AddInvoice;
