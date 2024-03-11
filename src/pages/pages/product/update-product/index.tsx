// ** React Imports
import {ReactNode} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import FormUpdateProduct from 'src/views/crud-product/FormUpdateProduct' 

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const UpdateProductPage = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} >
          <FormUpdateProduct />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default UpdateProductPage
