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

const UpdateProductPage = () => {
  const router = useRouter();
  const { idProduct } = router.query;

  const [product, setProduct] = useState(null as any);  
  const [stores, setStores] = useState([]);  
  const [errorFind, setErrorFind] = useState(false);
  const [errorStr, setErrorStr] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(idProduct as string);
        const storesData = await getAllStores();   
        setStores(storesData);     
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
    if(idProduct != undefined){
      fetchData();
    }
  }, [idProduct]);


  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} >
        {errorFind === true ? (
          <div>
              <Error404Edited errorStr={errorStr}/>
          </div>
        ) : (
          <FormUpdateProduct product={product} stores={stores} />
        )}
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default UpdateProductPage
