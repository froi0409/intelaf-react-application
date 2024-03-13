// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Styled Component
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";

// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";
import { FormRegisterCustomer } from "src/components/customers/register-customer/FormRegisterCustomer";

export const RegisterCustomer = (props:any) => {
    return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
            <FormRegisterCustomer />
        </Grid>
      </Grid>
    </DatePickerWrapper>
      )
}
