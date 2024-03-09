// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import EnhancedTable from './components/TableCustomer'

const ListAllCustomer = ({ data }: any) => {
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
  //fetch my server de spring
  const response  =  await fetch('http://localhost:8080/v1/customer/all')
  const data  = await response.json()

  return {
    props: {
      data : data
      // data : [
      //   {
      //     userIdUser: 1,
      //     nit: 123456789,
      //     name: 'Juan',
      //     phone: 12345678,
      //     dpi: 1234567890123,
      //     email: 'user1@example.com',
      //     address : '543 Plaza Trail',
      //     credit: 0
      //   },
      //   {
      //     "userIdUser": 2,
      //     "nit": 123456799,
      //     "name": "Gilberto",
      //     "phone": 55891123,
      //     "dpi": 1234567890333,
      //     "email": "user2@example.com",
      //     "address": "789 Turkey jhonson",
      //     "credit" : 500
      //   }
      // ]
    }
  }
}

export default ListAllCustomer
