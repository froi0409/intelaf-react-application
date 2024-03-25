import { TextField } from '@mui/material'
import React, { forwardRef, useEffect } from 'react'
import { CardForm } from 'src/components/generic/forms/CardForm'
import { GridItemForm } from 'src/components/generic/forms/GridItemForm'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Fecha de la orden' autoComplete='off' />
})

export const FormOrderHeader = (props: any) => {
    useEffect(() => {
        const currentDate = new Date();
        props.updateDate(currentDate);
    }, []);
  return (
    <CardForm title={`REALIZAR ORDEN DESDE LA TIENDA ${props.currentStore}`} >
        <GridItemForm md={12} >
        <DatePicker
                selected={props.getDate()}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-invoice-header-date'
                onChange={(date: Date) => props.updateDate(date)}
              />
        </GridItemForm>
    </CardForm>
  )
}
