// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import FormCreateProduct from 'src/views/crud-product/FormCreateProduct' 

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { getAllStores } from 'src/utils/apiUtils/store/allStoresUtil'



const CreateProductPage = () => {
  
  const [stores, setStores] = useState([]);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesData = await getAllStores();   
        setStores(storesData);     
      } catch (error) {
        console.log(error);
        // Aquí puedes manejar el error si es necesario
      }
    };

    fetchData();
  }, []);

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} >
          <FormCreateProduct stores={stores}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}


import EmployeeLayout from 'src/layouts/EmployeeLayout'
CreateProductPage.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default CreateProductPage
