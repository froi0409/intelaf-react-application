// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { getProductById } from 'src/utils/apiUtils/product/findProductByIdUtil'
import { getAllStores } from 'src/utils/apiUtils/store/allStoresUtil'
import Error404Edited from 'src/pages/404Edited'
import ProductDetailCard from 'src/views/customer-dashboard/ProductDetailCard'
import { Link, Typography } from '@mui/material'
import ProductStoreStock from 'src/views/customer-dashboard/ProductStoreStock'

const ProductDetail: React.FC = () => {
  const router = useRouter();  

  const [idProduct, setIdProduct] = useState<string | null>(null);

  useEffect(() => {
    const { idProduct } = router.query;
    if (typeof idProduct === 'string') {
      setIdProduct(idProduct);
    }
  }, [router.query]);

  const [product, setProduct] = useState(null as any);  
  const [stores, setStores] = useState(null as any);  

  const [errorFind, setErrorFind] = useState(false);
  const [errorStr, setErrorStr] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(idProduct as string);        
        const storesData = await getAllStores();
        setProduct(productData);        
        setStores(storesData);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          setErrorStr(error.message);
          setErrorFind(true);
        } else {
          setErrorStr("An unknown error occurred.");
        }
      }
    };
    if(idProduct != undefined || idProduct != null){
      fetchData();
    }
  }, [idProduct]);


  return (    
    <div>
      {errorFind === true ? (
        <Grid item xs={12}>
            <Error404Edited errorStr={errorStr}/>
        </Grid>
      ) : (
        product == null || stores == null ? (
          <Grid item xs={12}>
              Producto vacio
          </Grid>
        ) : (
          <Grid spacing={6}>
            <Grid item xs={12} md={12}>
              <Typography variant='h5'>
                <Link target='_blank'>
                  Detalles del producto
                </Link>
              </Typography>
              <Typography variant='body2'>Listado de detalles del producto</Typography>
            </Grid>
            <Grid container spacing={6} xs={12} md={12}>
              <Grid item sm={8}>
                <ProductDetailCard product={product}/>
              </Grid>
              <Grid item sm={4}>
                <ProductStoreStock stores={product.stores} allStores={stores}/>
              </Grid>
            </Grid>
          </Grid>
        )
      )}
    </div>
  )
}
import UserLayout from 'src/layouts/UserLayout'
ProductDetail.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

export default ProductDetail
