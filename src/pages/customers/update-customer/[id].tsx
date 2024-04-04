import { Grid } from '@mui/material';
import React, { useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { FormRegisterCustomer } from 'src/components/customers/register-customer/FormRegisterCustomer';
import { RegisterSale } from 'src/components/sales/invoice/RegisterSale';
import { FormCustomer } from '../register-customer';
import axios from 'axios';
import { FormCustomerU } from 'src/components/customers/update-customer/FormCustomerU';
import { FormButtons } from 'src/components/customers/update-customer/FormButtons';
import { useRouter } from 'next/router';
import { errorNotification, successNotification, successNotificationWithAction } from 'src/utils/helpers/notification';
import { updateCustomer } from 'src/utils/apiUtils/customer/updateCustomer';
import { getCookieJwtGetServerSideProps } from 'src/utils/cookieUtils';

const UpdateCustomer = ({ customer }: any) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormCustomer>({
    nit: customer.nit,
    name: customer.name,
    phone: customer.phone,
    dpi: customer.dpi,
    email: customer.email,
    address: customer.address,
    password: '', // Optional
    username: customer.username, // Optional
    credit: customer.credit,
  });

  // Manejador de cambio genérico para actualizar los datos del formulario
  const handleChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleConfirmationFormButtons = async () => {
    const isFormFilled = Object.entries(formData).filter(([key, value]) => key !== 'password').every(([key, value]) => value !== '');
    if (isFormFilled) {
      //send to the backend
      try {
        const data = await updateCustomer(formData)
        // successNotification('Se ha actualizado el comprador') // -> this will be change for an action
        successNotificationWithAction('Se ha actualizado el comprador', handleCancelFormButtons)
      } catch (error: any) {
        console.error(error.message);
        errorNotification(error.message);
      }
    } else {
      errorNotification('Llene todos los campos primero');
    }
  }

  const handleCancelFormButtons = () => {
    router.push(`/customers/list-all-customers/`);
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <FormCustomerU formData={formData} handleChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormButtons
            handleConfirmationFormButtons={handleConfirmationFormButtons}
            handleCancelFormButtons={handleCancelFormButtons}
          />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const jwt = getCookieJwtGetServerSideProps(context)
    const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/customer/findUpdate/${context.params.id}`, {
      headers: {
        Authorization: jwt
      }
    });
    const data = await response.data

    return {
      props: {
        customer: data
      }
    };
  } catch (error) {
    // Maneja cualquier error
    // console.error('Error fetching data:', error);

    // Retorna un objeto vacío si hay un error
    return {
      props: {
        customer: []
      }
    };
  }
}
import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
UpdateCustomer.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default UpdateCustomer;