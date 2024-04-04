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


interface StoreInfo {
  storeCode: string;
  stock: number;
}
  
interface Product{
  idProduct: string;
  name: string;
  manufacturer: string;
  price: number;
  description: string;
  guarantyMonths: number;
  stores:StoreInfo[];
}


const ListProductsPage = () => {

  const [productsData, setProductsData] = useState([]);  
  const [products, setProducts] = useState([]);  

  const handleSearch = (searchValue: string | null) => {
    const findProduct = products.filter((product: Product) => {
      if (searchValue) {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        return (
          product.idProduct.toLowerCase().includes(lowerCaseSearchValue) ||
          product.name.toLowerCase().includes(lowerCaseSearchValue) ||
          product.stores.some(store => store.storeCode.toLowerCase().includes(lowerCaseSearchValue))
        );
      } else {
        return true;
      }
    });    
    setProductsData(findProduct);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsD = await getAllProducts();   
        setProductsData(productsD);
        setProducts(productsD);     
      } catch (error) {
        console.log(error);
        // Aquí puedes manejar el error si es necesario
      }
    };

    fetchData();
  }, []);

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
      <SearchBarProduct handleSearch={handleSearch} />
    </Grid>
    <Grid item xs={12}>
      <Card>
      <TableListProducts products={productsData}/>
      </Card>
    </Grid>
    </Grid>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
ListProductsPage.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ListProductsPage
