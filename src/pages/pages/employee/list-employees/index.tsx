// ** React Imports
import {ReactNode} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import TableListEmployees from 'src/views/crud-employee/TableListEmployees'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader } from '@mui/material'

const ListEmployeesPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Listado de empleados' titleTypographyProps={{ variant: 'h6' }} />
          <TableListEmployees />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ListEmployeesPage
