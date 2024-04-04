// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Styled Component
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";

// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";
import { FormRegisterCustomer } from "src/components/customers/register-customer/FormRegisterCustomer";
import { RegisterSale } from "src/components/sales/invoice/RegisterSale";
import { useState } from "react";
import { registerCustomer } from "src/utils/apiUtils/customer/registercustomer";
import { errorNotification, successNotification } from "src/utils/helpers/notification";

// Interfaz para definir los tipos de datos del formulario
export interface FormCustomer {
  nit: string;
  name: string;
  phone: string;
  dpi: string;
  email: string;
  address: string;
  password: string;
  username: string;
  credit: number;
}

const RegisterCustomer = (props: any) => {

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState<FormCustomer>({
    nit: '',
    name: '',
    phone: '',
    dpi: '',
    email: '',
    address: '',
    password: '',
    username: '',
    credit: 0.0,
  });

  const clearFormData = () => {
    setFormData({
      nit: '',
      name: '',
      phone: '',
      dpi: '',
      email: '',
      address: '',
      password: '',
      username: '',
      credit: 0.0,
    });
  };

  // Manejador de cambio genérico para actualizar los datos del formulario
  const handleChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegistrationCustomer = async () => {
    const isFormFilled = Object.values(formData).every(value => value !== '');
    if (isFormFilled) {
      //send to the backend
      try {
        const data = await registerCustomer(formData)
        console.log('Customer registered successfully:', data);
        successNotification('Se ha registrado el comprador')
        clearFormData();
        // Handle success, e.g., display a confirmation message
      } catch (error: any) {
        console.error(error.message);
        errorNotification(error.message);
        // Handle errors, e.g., display an error message
      }
    } else {
      errorNotification('Llene todos los campos primero');
    }
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <FormRegisterCustomer formData={formData} handleChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <RegisterSale handleConfirmationRegisterSale={handleRegistrationCustomer} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
RegisterCustomer.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>
export default RegisterCustomer;