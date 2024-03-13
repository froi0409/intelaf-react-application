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

// ** Import request
import {getAllEmployeePath} from 'src/utils/apiUtils/employee/allEmployeeUtil'

const ListEmployeesPage = ({data} : any) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Listado de empleados' titleTypographyProps={{ variant: 'h6' }} />
          <TableListEmployees dataServer={data}/>
        </Card>
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(context: any) {
  // localhost:3000
  const domain = context.req.headers.host

  // /blog/3
  // const path = context.req.url

  //localhost:3000/blob/3
  // const fullAddress = domain + path
  
  try {
    const data = await getAllEmployeePath(domain)
    // Retorna los datos como props
    return {
      props: {
        data: data
      }
    };
  } catch (error) {
    // Maneja cualquier error
    console.error('Error fetching data:', error);
    
    // Retorna un objeto vacío si hay un error
    return {
      props: {
        data: []
      }
    };
  }
}

export default ListEmployeesPage
