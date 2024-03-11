// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Table for customers
import EnhancedTable from 'src/components/customers/list-all-customers/TableCustomer'
import { getAllCustomerPath } from 'src/utils/apiUtils/customer/allCustomer'

const ListAllCustomer = ({data} : any) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            Listado de Compradores
          </Link>
        </Typography>
        <Typography variant='body2'>Listado general de todos los compradores</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <EnhancedTable dataServer={data} />
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
    const data = await getAllCustomerPath(domain)
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

export default ListAllCustomer
