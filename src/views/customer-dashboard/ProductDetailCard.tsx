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

// Styled Grid component
const StyledGrid1 = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0 !important'
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3, 4.75),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  }
}))

// Styled Grid component
const StyledGrid2 = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0 !important'
  },
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  height: '11rem',
  borderRadius: theme.shape.borderRadius
}))

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

const ProductDetailCard : React.FC<ProductDetailCardProps> = ({ product }) => {
  return (
    <Card>
      <Grid container spacing={6}>
        <StyledGrid1 item xs={4} md={4} lg={4}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img alt='Stumptown Roasters' src='/images/cards/analog-clock.jpg' />
          </CardContent>
        </StyledGrid1>
        <StyledGrid1 item xs={8} md={8} lg={8}>
          <CardContent>
            <Typography variant='h5' sx={{ marginBottom: 2 }}>
              {product.name}
            </Typography>            
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              {product.description}
            </Typography>
            <Typography variant='body1' sx={{ marginBottom: 4 }}>
              Q.{product.price}
            </Typography>
            <Divider></Divider>
            <Typography variant='body1' sx={{ marginBottom: 4 }}>
              Q.{product.price}
            </Typography>
          </CardContent>          
        </StyledGrid1>
      </Grid>
    </Card>
  )
}

export default ProductDetailCard
