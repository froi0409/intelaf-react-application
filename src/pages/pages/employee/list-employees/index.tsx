// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import TableListEmployees from 'src/views/crud-employee/TableListEmployees'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader, Link, Typography } from '@mui/material'

// ** Import request
import {getAllEmployeePath} from 'src/utils/apiUtils/employee/allEmployeeUtil'
import { SearchBarEmployee } from 'src/components/employees/SearchBarEmployee'

interface EmployeeData {
  username: string;
  nit: string;
  name: string;
  phone: string;
  dpi: string;
  email: string;
  address: string;
  role: string;
  password: string;
}

const ListEmployeesPage = () => {

  const [employeeData, setEmployeeData] = useState([])
  const [data, setData] = useState([])

  const handleSearch = (searchvalue: string | null) => {
    const findCustomer = data.filter((employee : EmployeeData | any) => {
      if (searchvalue) {
        return (
          employee.username.toLowerCase().includes(searchvalue.toLowerCase()) ||
          employee.name.toLowerCase().includes(searchvalue.toLowerCase()) ||
          employee.nit.toLowerCase().includes(searchvalue.toLowerCase())           
        );
      } else {
        return true;
      }
    });
    console.log(findCustomer)
    setEmployeeData(findCustomer)
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllEmployeePath()
        setEmployeeData(data)
        setData(data);
      } catch (err) {
        console.log(err)
      }
    }
    fetch();
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <Typography variant='h5'>
          <Link target='_blank'>
            Listado de Empleados
          </Link>
        </Typography>
        <Typography variant='body2'>Listado general de todos los empleados</Typography>
      </Grid>
      <Grid item xs={12} md={8} >
        <SearchBarEmployee handleSearch={handleSearch} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableListEmployees dataServer={employeeData}/>
        </Card>
      </Grid>
    </Grid>
  )
}
import EmployeeLayout from 'src/layouts/EmployeeLayout'
ListEmployeesPage.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ListEmployeesPage
