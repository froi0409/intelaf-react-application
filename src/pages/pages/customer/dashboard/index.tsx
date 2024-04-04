// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import CustomerCatalog from 'src/views/customer-dashboard/CustomerCatalog'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader, Link, Typography } from '@mui/material'
import { getAllProducts } from 'src/utils/apiUtils/product/allProductsUtil'
import { SearchBarProductDashboard } from 'src/components/customers/dashboard/SearchBarProductDashboard'



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


const DashboardConsumer = () => {

  const [productsData, setProductsData] = useState([]);  
  const [products, setProducts] = useState([]);  

  const handleSearch = (searchValue: string | null) => {
    const findProduct = products.filter((product: Product) => {
      if (searchValue) {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        return (
          product.idProduct.toLowerCase().includes(lowerCaseSearchValue) ||
          product.name.toLowerCase().includes(lowerCaseSearchValue) ||
          product.manufacturer.toLowerCase().includes(lowerCaseSearchValue)
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
        <SearchBarProductDashboard handleSearch={handleSearch} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
        <CustomerCatalog products={productsData}/>
        </Card>
      </Grid>
    </Grid>
  )
}

import UserLayout from 'src/layouts/UserLayout'
DashboardConsumer.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

export default DashboardConsumer
