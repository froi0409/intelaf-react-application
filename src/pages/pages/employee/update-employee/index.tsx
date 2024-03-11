// ** React Imports
import {ReactNode} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import FormUpdateEmployee from 'src/views/crud-employee/FormUpdateEmployee' 

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const CreateEmployeePage = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} >
          <FormUpdateEmployee />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default CreateEmployeePage
