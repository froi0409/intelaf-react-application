// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import FormUpdateProduct from 'src/views/crud-product/FormUpdateProduct' 

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { getProductById } from 'src/utils/apiUtils/product/findProductByIdUtil'
import { getAllStores } from 'src/utils/apiUtils/store/allStoresUtil'
import Error404Edited from 'src/pages/404Edited'
import ProductDetailCard from 'src/views/customer-dashboard/ProductDetailCard'

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

  const [errorFind, setErrorFind] = useState(false);
  const [errorStr, setErrorStr] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(idProduct as string);        
        setProduct(productData);        
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
    <DatePickerWrapper>
      <Grid container spacing={6}>
        {errorFind === true ? (
          <Grid item xs={12}>
              <Error404Edited errorStr={errorStr}/>
          </Grid>
        ) : (
          product == null ? (
            <Grid item xs={12}>
                Producto vacio
            </Grid>
          ) : (
            <Grid item xs={12} sm={8}>
              <ProductDetailCard product={product}/>
            </Grid>
          )
        )}
      </Grid>
    </DatePickerWrapper>
  )
}

export default ProductDetail
