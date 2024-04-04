// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Table for customers
import EnhancedTable from 'src/components/customers/list-all-customers/TableCustomer'
import { getAllCustomer, getAllCustomerPath } from 'src/utils/apiUtils/customer/allCustomer'
import { SearchBarCustomer } from 'src/components/customers/list-all-customers/SearchBarCustomer'
import { useEffect, useState } from 'react'
import { CustomerData } from 'src/pages/api/customer/allCustomers'
// import { useSearchParams } from 'next/navigation';

const ListAllCustomer = () => {

  const [customerData, setCustomerData] = useState([])
  const [data, setData] = useState([])

  const handleSearch = (searchvalue: string | null) => {
    const findCustomer = data.filter((customer : CustomerData | any) => {
      if (searchvalue) {
        return (
          customer.name.toLowerCase().includes(searchvalue.toLowerCase()) ||
          customer.nit.toLowerCase().includes(searchvalue.toLowerCase())           
        );
      } else {
        return true;
      }
    });
    console.log(findCustomer)
    setCustomerData(findCustomer)
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllCustomer()
        setCustomerData(data)
        setData(data);
      } catch (err) {
        console.log(err)
      }
    }
    fetch();
  }, [])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Typography variant='h5'>
          <Link target='_blank'>
            Listado de Compradores
          </Link>
        </Typography>
        <Typography variant='body2'>Listado general de todos los compradores</Typography>
      </Grid>
      <Grid item xs={12} md={6} >
        <SearchBarCustomer handleSearch={handleSearch} placeholdershow={'Buscar por nombre o nit'} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <EnhancedTable dataServer={customerData} />
        </Card>
      </Grid>
    </Grid>
  )
}


// export async function getServerSideProps(context: any) {
//   // localhost:3000
//   const domain = context.req.headers.host

//   // /blog/3
//   // const path = context.req.url

//   //localhost:3000/blob/3
//   // const fullAddress = domain + path
  
//   try {
//     const data = await getAllCustomerPath(domain)
//     // Retorna los datos como props
//     return {
//       props: {
//         data: data
//       }
//     };
//   } catch (error) {
//     // Maneja cualquier error
//     console.error('Error fetching data:', error);
    
//     // Retorna un objeto vacío si hay un error
//     return {
//       props: {
//         data: []
//       }
//     };
//   }
// }
import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
ListAllCustomer.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ListAllCustomer
