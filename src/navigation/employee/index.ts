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
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';


// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Productos',      
      sectionTitle: 'Productos'
    },
    {
      icon: CubeOutline,
      title: 'Crear Producto',
      path: '/pages/product/create-product'
    },
    {
      icon: ListBoxOutline,
      title: 'Listar Productos',
      path: '/pages/product/list-products'
    },
    {
      title: 'Empleados',      
      sectionTitle: 'Empleados'
    },
    {
      icon: AccountPlus,
      title: 'Crear empleado',
      path: '/pages/employee/create-employee'
    },
    {
      icon: ListBoxOutline,
      title: 'Listar empleados',
      path: '/pages/employee/list-employees',      
    },
    {
      title: 'Reportes',      
      sectionTitle: 'Reportes'
    },
    {
      icon: SummarizeOutlinedIcon,
      title: '10 Productos mas vendidos en un intervalo de tiempo',
      path: '/pages/reports/best-selling-products'
    },
    {
      icon: SummarizeOutlinedIcon,
      title: 'Ordenes en ruta por Usuario',
      path: '/pages/reports/orders-by-idCustomer'
    },
    {
      icon: SummarizeOutlinedIcon,
      title: 'Compras realizadas por Usuario',
      path: '/pages/reports/sales-by-idCustomer'
    },
    {
      title: 'Ventas',      
      sectionTitle: 'Ventas'
    },
    {
      title: 'Realizar una Factura',
      path: '/sales/add-invoice',
      icon: InvoicePlus
    },
    {
      sectionTitle: 'Ordenes'
    },
    {
      title: 'Nueva orden',
      path: '/orders/new-order',
      icon: FileDocumentPlusOutline
    },
    {
      title: 'Ordenes enviadas',
      path: '/orders/orders-shipping',
      icon: FileDocumentPlusOutline
    },
    {
      title: 'Ordenes para recibir',
      path: '/orders/orders-receive',
      icon: FileDocumentPlusOutline
    },
    {
      sectionTitle: 'Compradores'
    },
    {
      title: 'Listado de compradores',
      path: '/customers/list-all-customers',
      icon: ListBoxOutline
    },
    {
      title: 'Agregar un comprador',
      path: '/customers/register-customer/',
      icon: AccountPlus
    },
    {
      title: 'Solo usuarios',      
      sectionTitle: 'Solo usuarios'
    },
    {
      icon: CubeOutline,
      title: 'Dashboard Customer',
      path: '/pages/customer/dashboard'
    },
  ]
}

export default navigation