// ** React Imports
import {ReactNode} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import TableListProducts from 'src/views/crud-product/TableListProducts'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader } from '@mui/material'

const ListProductsPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Listado de productos' titleTypographyProps={{ variant: 'h6' }} />
          <TableListProducts />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ListProductsPage
