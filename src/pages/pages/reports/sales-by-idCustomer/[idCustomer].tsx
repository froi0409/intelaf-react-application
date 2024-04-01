// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import TableListProducts from 'src/views/crud-product/TableListProducts'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader, Link, Typography } from '@mui/material'
import { getAllProducts } from 'src/utils/apiUtils/product/allProductsUtil'
import { SearchBarProduct } from 'src/components/products/SearchBarProduct'
import { SearchBarSale } from 'src/components/reports/sales-by-idCustomer/SearchBarSale'
import TableListSalesByIdCustomer from 'src/views/reports/TableListSalesByIdCustomer'
import { useRouter } from 'next/router'

  
interface Sale{
  idSale: number;
  date: string;
  total: number;
  idCustomer: string;
}

//<SearchBarSale handleSearch={handleSearch} />
//<TableListSalesByIdCustomer />
const ListSalesByIdCustomer: React.FC = () => {
  const router = useRouter();  

  const [idCustomer, setIdCustomer] = useState<string | null>(null);

  useEffect(() => {
    const { idCustomer } = router.query;
    if (typeof idCustomer === 'string') {
        setIdCustomer(idCustomer);
    }
  }, [router.query]);

  const [sales, setSales] = useState<Sale[]>([
    {
      idSale: 1,
      date: '2024-01-01',
      total: 100,
      idCustomer: 'CR-1'
    },
    {
      idSale: 2,
      date: '2024-01-01',
      total: 200,
      idCustomer: 'CR-1'
    }
  ]);
  

  return (
    <Grid container spacing={6}>
    <Grid item xs={12} md={4}>
      <Typography variant='h5'>
        <Link target='_blank'>
          Listado de Productos
        </Link>
      </Typography>
      <Typography variant='body2'>Listado general de todos los productos</Typography>
    </Grid>
    <Grid item xs={12} md={8} >
      
    </Grid>
    <Grid item xs={12}>
      <Card>
        <TableListSalesByIdCustomer sales={sales}/>
      </Card>
    </Grid>
    </Grid>
  )
}

export default ListSalesByIdCustomer
