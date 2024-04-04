// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import FormCreateEmployee from 'src/views/crud-employee/FormCreateEmployee' 

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const CreateEmployeePage = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} >
          <FormCreateEmployee />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
CreateEmployeePage.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default CreateEmployeePage
