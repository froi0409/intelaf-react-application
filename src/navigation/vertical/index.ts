// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import InvoicePlus from 'mdi-material-ui/InvoicePlus'
import ListBoxOutline from 'mdi-material-ui/ListBoxOutline'
import AccountPlus from 'mdi-material-ui/AccountPlus'
import FileDocumentPlusOutline from 'mdi-material-ui/FileDocumentPlusOutline'
import FileChartOutline from 'mdi-material-ui/FileChartOutline'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';


// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Solo usuarios',      
      sectionTitle: 'Solo usuarios'
    },
    {
      icon: HomeOutline,
      title: 'Dashboard Usuario',
      path: '/pages/customer/dashboard'
    },

    {
      icon: ShareLocationOutlinedIcon,
      title: 'Rastreo Pedido',
      path: '/pages/customer/tracking-order'
    },
  ]
}

export default navigation
