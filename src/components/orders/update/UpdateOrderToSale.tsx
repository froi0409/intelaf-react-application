import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CardForm } from 'src/components/generic/forms/CardForm'
import { GridItemForm } from 'src/components/generic/forms/GridItemForm'
import { FormInvoicePay } from 'src/components/sales/invoice/FormInvoicePay'
import { InvoiceProduct, PaymentInfo } from 'src/utils/apiUtils/sale/invoice/registerSale'
import { errorNotification, successNotification, successNotificationWithAction } from 'src/utils/helpers/notification'
import { FormOrderHeader } from '../order/FormOrderHeader'
import SpanningInvoiceTable from 'src/components/sales/invoice/SpanningInvoiceTable'
import TableInvoicePayments from 'src/components/sales/invoice/TableInvoicePayments'
import { FormOrderToSaleCustomer } from './updateForms/FormOrderToSaleCustomer'
import { RegisterSale } from 'src/components/sales/invoice/RegisterSale'
import { SaleDataBackend, registerOrderToSale } from 'src/utils/apiUtils/sale/order/registerOrderToSale'
import { StatusOrderDateData, updateStatusOrder } from 'src/utils/apiUtils/order/updateStatusOrder'
import { getCurrentStore } from 'src/utils/helpers/cookieStore'


interface GetProduct {
    productId: string;
    quantity: number;
    name: string;
    price: number;
}

interface GetPayment {
    type: string;
    amount: number;
}

export function priceInvoiceProduct(qty: number, unit: number) {
    return qty * unit;
}

export function createInvoiceProduct(id_product: string, name: string, quantity: number, unit_price: number) {
    const price = priceInvoiceProduct(quantity, unit_price);
    return { id_product, name, quantity, unit_price, price };
}

export const UpdateOrderToSale = (props: any) => {
    const currentStore = getCurrentStore();

    //header
    const [date, setDate] = useState<Date | null | undefined>(null)

    //customers
    const [nit, setNit] = useState<string>(props.order.nit);
    const [credits, setcredits] = useState<number>(0);

    //products
    const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProduct[]>([]);

    //payments
    const [payments, setPayments] = useState<PaymentInfo[]>([]);
    const [stillPay, setStillPay] = useState(0);
    const [total, setTotal] = useState(Number(props.order.total));

    //fill all
    useEffect(() => {
        //products
        props.order.products.map(addProduct);
        props.order.payments.map(addPaymentDone);
    }, [])

    const updateDate = (date: Date) => {
        setDate(date);
    }

    const getDate = () => { return date; }

    const getcredits = (creditRecive: number) => {
        setcredits(creditRecive);
    }

    const addProduct = (product: GetProduct) => {
        const invoiceProduct = createInvoiceProduct(product.productId, product.name, product.quantity, product.price);
        setInvoiceProducts([...invoiceProducts, invoiceProduct]);
    }

    const addPaymentDone = (payment: GetPayment) => {
        const currentTotalPayments: number = payments.reduce((acc, payment) => Number(acc) + payment.amount, 0);
        const futureCurrentTotalPayments = (Number(currentTotalPayments) + payment.amount)
        const leftPay = total - futureCurrentTotalPayments;
        setStillPay(Number(leftPay))
        setPayments([...payments, { type: 'advance', amount: Number(payment.amount) }]);
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

    const updateTotal = (total: number) => {
        const currentTotalPayments: number = payments.reduce((acc, payment) => Number(acc) + payment.amount, 0);
        const leftPay = total - currentTotalPayments;
        setStillPay(Number(leftPay))
        setTotal(total);
    }

    const isValid = () => {
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

    const convertDate = (d: any) => {
        const date = new Date(d);
        const isoDateString = date.toISOString(); // Converts the date to ISO 8601 format
        return isoDateString
    }

    const handleUpdateOrderToSale = async () => {
        //Validations first, Nit, total <> 0, stillPay == 0
        if (!isValid()) {
            errorNotification('Revise todos los campos antes de continuar')
            return
        }

        try {
            const saleData: SaleDataBackend = {
                date: convertDate(date), // Si date es undefined o null, asigna una cadena vacía ''
                total: total || 0,
                nit: nit.toString(), // Convierte nit a cadena usando .toString()
                products : props.order.products,
                payments: payments,
                storeCode : currentStore,
                dateEntry : props.order.dateEntry,
                estimatedDeliveryDate : props.order.estimatedDeliveryDate
              };

            const data = await registerOrderToSale(saleData);
            const orderData : StatusOrderDateData = {
                idOrder: props.order.idOrder,
                status: 'customer_delivered',
                dateEntry: null
            }
            const dataStatus = await updateStatusOrder(orderData);
            successNotificationWithAction(data.message, props.handleCancelFormButtons)
        } catch (error: any) {
            errorNotification(error.message);
        }

    }

    const handleCancelOrder = () => {
        props.handleCancelFormButtons()
    }
    return (
        <DatePickerWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <FormOrderHeader currentStore={currentStore} updateDate={updateDate} getDate={getDate} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormOrderToSaleCustomer nit={nit} getcredits={getcredits} />
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
                    <RegisterSale handleConfirmationRegisterSale={handleUpdateOrderToSale} handleCancelSale={handleCancelOrder} />
                </Grid>
            </Grid>
        </DatePickerWrapper>
    )
}
