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


// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    /*{
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    },
    */
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
    /*
    {
      icon: CubeOutline,
      title: 'UpdateProduct',
      path: '/pages/product/update-product'
    },
    */
    {
      title: 'Empleados',      
      sectionTitle: 'Empleados'
    },
    {
      icon: AccountPlus,
      title: 'Crear empleado',
      path: '/pages/employee/create-employee'
    },
    /*
    {
      icon: CubeOutline,
      title: 'Actualizar Empleado',
      path: '/pages/employee/update-employee'
    },
    */
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
      icon: FileDocumentOutline
    },
    {
      title: 'Ordenes para recibir',
      path: '/orders/orders-receive',
      icon: FileDocumentOutline
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
      path: '/customers/register-customer',
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
    {
      sectionTitle : 'Reportes'
    },
    {
      title: '2. tiempo de estar en tienda sin Verificacion',
      path: '/reports/orders/in-time-pending-verify',
      icon: FileChartOutline
    },
    {
      title: '3. Pedidos atrasados',
      path: '/reports/orders/overdue-arriving-store',
      icon: FileChartOutline
    },
    {
      title: '4. Salida y transito',
      path: '/reports/orders/leaving-store-in-transit',
      icon: FileChartOutline
    },
  ]
}

export default navigation
