// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import FormUpdateEmployee from 'src/views/crud-employee/FormUpdateEmployee' 

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import {getEmployeeByUsernamePath} from 'src/utils/apiUtils/employee/findEmployeeUtil'

import { useRouter } from 'next/router';


interface Employee {
  idUser: number;
  nit: string;
  name: string;
  phone: string;
  dpi: string;
  email: string;
  address: string;
  username: string;
  password: string;
  role: string;
}

const UpdateEmployeePage = () => {
  const router = useRouter();
  const { username } = router.query;

  const [employee, setEmployee] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await getEmployeeByUsernamePath(username as string);
        setEmployee(employeeData);
      } catch (error) {
        console.log(error);
        // Aquí puedes manejar el error si es necesario
      }
    };

    fetchData();
  }, [username]);
  

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} >
          <FormUpdateEmployee employee={employee}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}



export default UpdateEmployeePage
