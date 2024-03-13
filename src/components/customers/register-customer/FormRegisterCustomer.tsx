import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { CardContent, CardHeader, Divider, TextField } from '@mui/material'
import { useState } from 'react'

// Interfaz para definir los tipos de datos del formulario
interface FormCustomer {
    nit: string;
    name: string;
    address: string;
    // Agrega los otros 9 campos aquí
  }

export const FormRegisterCustomer = () => {

    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState<FormCustomer>({
        nit: '',
        name: '',
        address: '',
        // Inicializa los otros 9 campos aquí
    });

    // Manejador de cambio genérico para actualizar los datos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleFormRegistration = (e:any) => {
        e.preventDefault();

    }
  return (
    <Card  >
        <CardHeader title='Registro del cliente' titleTypographyProps={{ variant: 'h6' }}  />
        <Divider sx={{ margin: 0 }} />
        <form onSubmit={handleFormRegistration} >
            <CardContent >
                <Grid container spacing={5}>
                    <Grid xs={12} sm={6} >
                        <TextField fullWidth 
                            label='NIT' 
                            placeholder='CF / 12345678' 
                            value={formData.nit}
                            onChange={handleChange} />
                    </Grid>
                </Grid>
            </CardContent>
        </form>
    </Card>
  )
}
