// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid, { GridProps } from '@mui/material/Grid'
import { Divider, Link } from '@mui/material'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';

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

interface Store {
  idStore: string;
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  storeHours: string | null;
}

interface ProductStoreStockProps {
  stores:StoreInfo[];
  allStores: Store[];
}

const ProductStoreStock : React.FC<ProductStoreStockProps> = ({ stores,allStores }) => {
  return (
    <Card>
      <Grid spacing={6}>
        <CardContent>
            <Typography variant='h5' sx={{ marginBottom: 2 ,marginTop:2}}>
                Disponibilidad
            </Typography>            
        </CardContent>
      </Grid>
      <Divider variant="middle"/>
      <CardContent>
      <Grid spacing={6}>
          {stores.map((store, index) => {
            const foundStore = allStores.find((s) => s.idStore === store.storeCode);
            const storeName = foundStore ? foundStore.name : 'Nombre no encontrado';
            const storeAddress = foundStore ? foundStore.address : 'Direccion no encontrado';
            return (
              <Grid key={index} container spacing={2} alignItems="center">
              <Grid item xs={6} sx={{ marginBottom: 2 }}>
                <Typography variant='body1'>
                  {storeName}
                </Typography>
                <Typography variant='caption'>
                  {storeAddress}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body2' sx={{ marginBottom: 1 }}>
                  Stock: {store.stock}
                </Typography>
              </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      
    </Card>
  )
}

export default ProductStoreStock
