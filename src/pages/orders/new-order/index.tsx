import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { FormButtons } from 'src/components/customers/update-customer/FormButtons';
import { GridItemForm } from 'src/components/generic/forms/GridItemForm';
import { FormOrderHeader } from 'src/components/orders/order/FormOrderHeader';
import { AutocompleteProducts, FormOrderProduct } from 'src/components/orders/order/FormOrderProduct';
import { FormOrderStore } from 'src/components/orders/order/FormOrderStore';
import FormInvoiceCustomer from 'src/components/sales/invoice/FormInvoiceCustomer';
import { FormInvoicePay } from 'src/components/sales/invoice/FormInvoicePay';
import SpanningInvoiceTable from 'src/components/sales/invoice/SpanningInvoiceTable';
import TableInvoicePayments from 'src/components/sales/invoice/TableInvoicePayments';
import { Products_Stock } from 'src/pages/api/sale/stockProducts';
import { createInvoiceProduct, priceInvoiceProduct } from 'src/pages/sales/add-invoice';
import { OrderData, registerOrder } from 'src/utils/apiUtils/order/addOrder';
import { getAllProductsStockByStore } from 'src/utils/apiUtils/sale/invoice/products';
import { InvoiceProduct, PaymentInfo } from 'src/utils/apiUtils/sale/invoice/registerSale';
import { getAllStores } from 'src/utils/apiUtils/store/allStores';
import { getCurrentStore } from 'src/utils/helpers/cookieStore';
import { errorNotification, successNotification } from 'src/utils/helpers/notification';

const NewOrder = () => {
  const currentStore = getCurrentStore();
  //header
  const [date, setDate] = useState<Date | null | undefined>(null)
  //customers
  const [nit, setNit] = useState<string>('');
  const [credits, setcredits] = useState<number>(0);
  //store
  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  //products
  const [products, setProducts] = useState<Products_Stock[]>([]);
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProduct[]>([]);

  //payments
  const [minimumPay, setMinimumPay] = useState<number>(0);
  const [payments, setPayments] = useState<PaymentInfo[]>([]);
  const [stillPay, setStillPay] = useState(0);
  const [total, setTotal] = useState(0);

  const fetch = async () => {
    try {
      const data = await getAllProductsStockByStore();
      const dataStore = await getAllStores()
      setProducts(data);
      setStores(dataStore.data);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const getDate = () => { return date; }

  const updateDate = (date: Date) => {
    setDate(date);
  }

  const reciveNit = (nitRecive: string) => {
    setNit(nitRecive);
  }

  const getcredits = (creditRecive: number) => {
    setcredits(creditRecive);
  }

  const handleOnUpdatesetSelectedStore = (storecode: string | null) => {
    setSelectedStore(storecode)
  }

  const addProduct = (product: AutocompleteProducts, quantity: number, maxStock: number) => {
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

  const updateTotal = (total: number) => {
    const currentTotalPayments: number = payments.reduce((acc, payment) => Number(acc) + payment.amount, 0);
    const leftPay = total - currentTotalPayments;
    setStillPay(Number(leftPay))
    setTotal(total);
    setMinimumPay((Number(total) * 0.25))
  }

  const addPayment = (selectedPayment: string, paymentAmount: number) => {
    // Verifica si se ha seleccionado un tipo de pago y se ha ingresado una cantidad
    if (selectedPayment && paymentAmount > 0) {
      paymentAmount = Number(paymentAmount)
      // Agrega el nuevo método de pago al estado
      // Calcula la suma de los montos de los pagos actuales
      const currentTotalPayments: number = payments.reduce((acc, payment) => Number(acc) + payment.amount, 0);
      const futureCurrentTotalPayments = (Number(currentTotalPayments) + paymentAmount)
      // Verifica que la suma de los montos de los pagos no sea mayor al total de la factura
      if (futureCurrentTotalPayments > total) {
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

  const isValid = () => {
    // Verifica si Nit no es una cadena vacía
    if (nit === '') {
      errorNotification('Tiene que agregar un comprador valido');
      return false;
    }

    if (total === 0) {
      errorNotification('Termine de realizar la orden');      
      return false;
    }
    const minimumToPay = total * 0.25;
    // Verifica si stillPay es igual a cero
    if (stillPay > (total - minimumToPay)) {
      errorNotification('Tiene que pagar al menos el 25%');
      return false;
    }
  
    return true;
  };

  const handleConfirmationRegisterSale = async () => {
    if (!isValid()) {
      return
    }

    try {
      const orderData: OrderData = {
        nit,
        idStoreShipping : selectedStore as string,
        idStoreReceive: currentStore,
        dateDeparture : date,
        total,
        status : 'pending',
        payments,
        products : invoiceProducts
      }
      const data = await registerOrder(orderData);
      successNotification(data.message)
      ClearData();
    } catch (error: any) {
      errorNotification(error.message);
    }
  }

  const ClearData =() => {
    setNit('')
    setcredits(0)
    setInvoiceProducts([])
    setPayments([])
    fetch();
    setStillPay(0);
    setTotal(0);
    setMinimumPay(0)
    setSelectedStore(null)
  }

  const handleCancelSale = () => {
    ClearData();
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <GridItemForm md={12}>
          <FormOrderHeader currentStore={currentStore} updateDate={updateDate} getDate={getDate} />
        </GridItemForm>
        <GridItemForm md={12}>
          <FormInvoiceCustomer nit={nit} reciveNit={reciveNit} getcredits={getcredits} />
        </GridItemForm>
        <GridItemForm md={12}>
          <FormOrderStore currentStore={currentStore} stores={stores} handleOnUpdatesetSelectedStore={handleOnUpdatesetSelectedStore} />
        </GridItemForm>
        <GridItemForm md={12}>
          {selectedStore && <FormOrderProduct
            products={products}
            selectedStore={selectedStore}
            addProduct={addProduct}
          />}
        </GridItemForm>
        <GridItemForm md={12}>
          {invoiceProducts.length > 0 &&
            <SpanningInvoiceTable
              products={invoiceProducts}
              updateTotal={updateTotal}
            />}
        </GridItemForm>
        <GridItemForm md={12}>
          {total > 0 && 
          <FormInvoicePay minimumPay={minimumPay} credits={credits} addPayment={addPayment} stillPay={stillPay} />}
        </GridItemForm>
        <GridItemForm md={12}>
            <TableInvoicePayments payments={payments} />
        </GridItemForm>
        <GridItemForm md={12}>
          <FormButtons handleConfirmationFormButtons={handleConfirmationRegisterSale} handleCancelFormButtons={handleCancelSale} />
        </GridItemForm>
      </Grid>
    </DatePickerWrapper>
  )
}
import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
NewOrder.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default NewOrder;