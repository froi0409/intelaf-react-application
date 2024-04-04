import { Divider, Grid } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { FormButtons } from 'src/components/customers/update-customer/FormButtons'
import { GridItemForm } from 'src/components/generic/forms/GridItemForm'
import { UpdateOrderStatus } from 'src/components/orders/update/UpdateOrderStatus'
import { UpdateOrderToSale } from 'src/components/orders/update/UpdateOrderToSale'
import AddInvoice from 'src/pages/sales/add-invoice'
import { getCookieJwtGetServerSideProps } from 'src/utils/cookieUtils'
import { getCurrentStore } from 'src/utils/helpers/cookieStore'
import { errorNotification, successNotificationWithAction } from 'src/utils/helpers/notification'

const UpdateOrder = ({ order }: any) => {
    const currentStore = getCurrentStore();
    
    //verificar por el estatus
    const [selectedStatus, setSelectedStatus] = useState(order.status.toLocaleLowerCase());
    const isOrderAlreadySale = order.status === 'customer_delivered'

    const router = useRouter();
    const [formData, setFormData] = useState({});

    const handleStatusChange = (status : string) => {
        setSelectedStatus(status);
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
        router.back();
    }

    const validateTheOrder = (): boolean => { // defining a function that returns boolean
        if (selectedStatus === 'customer_delivered' && 
                order.status.toLocaleLowerCase() !== 'customer_delivered' &&
                order.idStoreShipping !== currentStore &&
                order.dateEntry !== null) {
            return true;
        }
        return false;
    };
    
    // Usage
    const result: boolean = validateTheOrder(); // calling the function to get the boolean value
    

    return (
        <DatePickerWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <UpdateOrderStatus 
                    status={order.status} 
                    idOrder={order.idOrder} 
                    dateEntry={order.dateEntry}
                    selectedStatus = {selectedStatus}
                    handleStatusChange = {handleStatusChange}
                    handleCancelFormButtons = {handleCancelFormButtons}
                    isOrderAlreadySale = {isOrderAlreadySale}
                     />
                </Grid>
            </Grid>
            { validateTheOrder()  &&
            <Fragment>
                <Divider sx={{ margin: '1em' }} />
                <UpdateOrderToSale order={order} handleCancelFormButtons={handleCancelFormButtons} />
            </Fragment>
            }
        </DatePickerWrapper>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const jwt = getCookieJwtGetServerSideProps(context)
        const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/order/find-all-feature-id/${context.params.id}`, {
            headers: {
              Authorization: jwt
            }
          });
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
import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
UpdateOrder.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default UpdateOrder;
