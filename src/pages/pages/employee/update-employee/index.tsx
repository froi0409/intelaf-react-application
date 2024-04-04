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
import Error404Edited from 'src/pages/404Edited'


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

  const [employee, setEmployee] = useState(null as any);  

  const [errorFind, setErrorFind] = useState(false);
  const [errorStr, setErrorStr] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await getEmployeeByUsernamePath(username as string);
        setEmployee(employeeData);
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

    if(username != undefined){
      fetchData();
    }
  }, [username]);
  

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} >
          
          {errorFind === true ? (
          <div>
              <Error404Edited errorStr={errorStr}/>
          </div>
        ) : (
          <FormUpdateEmployee employee={employee}/>
        )}
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
UpdateEmployeePage.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default UpdateEmployeePage
