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
import axios from 'axios'
import { getCookieJwt } from 'src/utils/helpers/cookieUtils'

const UpdateProductPage = () => {
  const router = useRouter();
  const { idProduct } = router.query;

  const [product, setProduct] = useState(null as any);  
  const [stores, setStores] = useState([]);  
  const [errorFind, setErrorFind] = useState(false);
  const [errorStr, setErrorStr] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(idProduct as string);
        const storesData = await getAllStores();   
        setStores(storesData);     
        setProduct(productData);

        /* Bring image*/
        try {
          const response = await axios.get(`http://localhost:8080/v1/images/image-by-idProduct/${idProduct}`, {
            responseType: 'blob',
            headers: {
              Authorization: getCookieJwt()
            }
          });
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
        } catch (error) {
          console.log('No hay imagen')
        }

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
          <FormUpdateProduct product={product} stores={stores} imageSrc={imageSrc}/>
        )}
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
UpdateProductPage.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default UpdateProductPage
