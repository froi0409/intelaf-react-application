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
import { Card, CardHeader } from '@mui/material'
import { getAllProducts } from 'src/utils/apiUtils/product/allProductsUtil'

const ListProductsPage = () => {

  const [products, setProducts] = useState([]);  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();   
        setProducts(productsData);     
      } catch (error) {
        console.log(error);
        // Aquí puedes manejar el error si es necesario
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Listado de productos' titleTypographyProps={{ variant: 'h6' }} />
          <TableListProducts products={products}/>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ListProductsPage
