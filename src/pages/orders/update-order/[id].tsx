import { Divider, Grid } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { FormButtons } from 'src/components/customers/update-customer/FormButtons'
import { GridItemForm } from 'src/components/generic/forms/GridItemForm'
import { UpdateOrderStatus } from 'src/components/orders/update/UpdateOrderStatus'
import { UpdateOrderToSale } from 'src/components/orders/update/UpdateOrderToSale'
import AddInvoice from 'src/pages/sales/add-invoice'
import { errorNotification, successNotificationWithAction } from 'src/utils/helpers/notification'

const UpdateOrder = ({ order }: any) => {
    // console.log(order)
    const router = useRouter();
    const [formData, setFormData] = useState({});

    // Manejador de cambio genérico para actualizar los datos del formulario
    const handleChange = (name: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirmationFormButtons = async () => {
        const isFormFilled = Object.values(formData).every(value => value !== '');
        if (isFormFilled) {
            //send to the backend
            try {
                // const data = await updateCustomer(formData)
                // successNotification('Se ha actualizado el comprador') // -> this will be change for an action
                successNotificationWithAction('Orden Actualizada', handleCancelFormButtons)
            } catch (error: any) {
                console.error(error.message);
                errorNotification(error.message);
            }
        } else {
            errorNotification('Llene todos los campos primero');
        }
    }

    const handleCancelFormButtons = () => {
        router.push(`/orders/list-orders-receive/`);
    }


    return (
        <DatePickerWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <UpdateOrderStatus status={order.status} idOrder={order.idOrder} dateEntry={order.dateEntry} />
                </Grid>
            </Grid>
            <Divider sx={{ margin: '1em' }} />
            <UpdateOrderToSale order={order} />
        </DatePickerWrapper>
    )
}

export async function getServerSideProps(context: any) {
    try {

        const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/order/find-all-feature-id/${context.params.id}`)
        const data = await response.data

        return {
            props: {
                order: data
            }
        };
    } catch (error) {
        // Maneja cualquier error
        console.error('Error fetching data:', error);

        // Retorna un objeto vacío si hay un error
        return {
            props: {
                order: []
            }
        };
    }
}

export default UpdateOrder;
