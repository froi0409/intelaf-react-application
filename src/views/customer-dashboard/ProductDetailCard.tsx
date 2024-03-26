// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid, { GridProps } from '@mui/material/Grid'
import { Divider } from '@mui/material'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import ImageComponentDetail from 'src/components/customers/dashboard/ImageComponent'



interface StoreInfo {
  storeCode: string;
  stock: number;
}

interface Product{
  idProduct: string;
  name: string;
  manufacturer: string;
  price: number;
  description: string;
  guarantyMonths: number;
  stores:StoreInfo[];
}

interface ProductDetailCardProps {
  product: Product;  
}
//<Img alt='Stumptown Roasters' src='/images/cards/analog-clock.jpg' />
const ProductDetailCard : React.FC<ProductDetailCardProps> = ({ product }) => {
  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImageComponentDetail idProduct={product.idProduct}/>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant='h5' sx={{ marginBottom: 2 }}>
              {product.name}
            </Typography>            
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              {product.description}
            </Typography>
            <Typography variant='body1' sx={{ marginBottom: 4 }}>
              Precio: Q.{product.price}
            </Typography>
            <Divider variant="middle"/>
            <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <FactoryOutlinedIcon sx={{ marginRight: 1 }}/>Fabricante: {product.manufacturer}
            </Typography>
            <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <StorefrontOutlinedIcon sx={{ marginRight: 1 }} />Codigo Intelaf: {product.idProduct}
            </Typography>
            {product.guarantyMonths != null ? (
              <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <GppGoodOutlinedIcon sx={{ marginRight: 1 }} /> Garantia: {product.guarantyMonths} Meses
              </Typography>
            ) : (
              <div></div>
            )}
          </CardContent>          
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProductDetailCard
