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
  //fetch de my server de spring
  // const response  =  await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  // const data  = await response.json()
  // console.log(data)

  return {
    props: {
      data : [
        {
          id_user: 1,
          nit: 123456789,
          name: 'Juan',
          phone: 12345678,
          dpi: 1234567890123,
          email: 'user1@example.com',
          address : '543 Plaza Trail'
        },
        {
          "id_user": 2,
          "nit": 123456799,
          "name": "Gilberto",
          "phone": 55891123,
          "dpi": 1234567890333,
          "email": "user2@example.com",
          "address": "789 Turkey jhonson"
        }
      ]
    }
  }
}

export default ListAllCustomer
