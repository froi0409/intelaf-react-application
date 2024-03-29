import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import { CardForm } from 'src/components/generic/forms/CardForm'
import { GridItemForm } from 'src/components/generic/forms/GridItemForm'
import { StatusOrderDateData, updateStatusOrder } from 'src/utils/apiUtils/order/updateStatusOrder'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { errorNotification, successNotification } from 'src/utils/helpers/notification'

const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Fecha de Arrivo' autoComplete='off' />
})

interface StatusOrderDateDataA {
    idOrder: number;
    status: string;
    dateEntry : Date | null;
}


export const UpdateOrderStatus = (props: StatusOrderDateDataA) => {

    const [selectedStatus, setSelectedStatus] = useState(props.status.toLocaleLowerCase());
    const [date, setDate] = useState(props.dateEntry);

    /*handles */
    const handleStatusChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedStatus(event.target.value as string);
    };

    const handleDateOnChange = (event: any) => {
        const date = new Date(event);
        setDate(date);
        // const isoDateString = date.toISOString(); // Converts the date to ISO 8601 format
        // console.log(isoDateString); // Outputs: 2024-03-07T06:00:00.000Z (UTC time, adjust accordingly)
        // const formattedDate = isoDateString.substring(0, 10); // Extracts the date part
        // console.log(formattedDate); // Outputs: 2024-03-07
    }

    const converDate = () => {
        if(date && !props.dateEntry && selectedStatus == 'store_receive' ) {
            const isoDateString = date.toISOString(); // Converts the date to ISO 8601 format
            return isoDateString
        } else {
            return null
        }
    }

    
    const handleUpdateStatusOrder = async () => {
        try {
            const dateEntry = converDate();
            const orderData : StatusOrderDateData = {
                idOrder : props.idOrder,
                status : selectedStatus,
                dateEntry : dateEntry,
            }
            const data = await updateStatusOrder(orderData);
            successNotification(data.message)
        } catch (error:any) {
            errorNotification(error.message);
        }
    }

    return (
        <CardForm title={`Actualizar Orden No. ${props.idOrder}`} >
            <GridItemForm >
                <FormControl fullWidth>
                    <InputLabel id="update-order-status-select-label">Estado</InputLabel>
                    <Select
                        label="type_status"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        id="update-order-status-select"
                        labelId="update-order-status-select-label"
                    >
                        <MenuItem value="pending">Pendiente</MenuItem>
                        <MenuItem value="route">En Ruta</MenuItem>
                        <MenuItem value="store_receive">En tienda</MenuItem>
                        <MenuItem value="customer_delivered">Entregado al cliente</MenuItem>
                    </Select>
                </FormControl>
            </GridItemForm>
            {selectedStatus == 'store_receive' && !props.dateEntry &&

                <GridItemForm >
                    <DatePicker
                        selected={date}
                        showYearDropdown
                        showMonthDropdown
                        placeholderText='MM-DD-YYYY'
                        customInput={<CustomInput />}
                        id='update-order-status-date'
                        onChange={handleDateOnChange}
                    />
                </GridItemForm>
            }
            <GridItemForm md={12} >
                <Button onClick={handleUpdateStatusOrder} size="large" type="submit" sx={{ mr: 2 }} variant="outlined">
                    Actualizar
                </Button>
            </GridItemForm>
        </CardForm>
    )
}
