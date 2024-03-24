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


// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
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
    {
      icon: CubeOutline,
      title: 'CreateProduct',
      path: '/pages/product/create-product'
    },
    {
      icon: CubeOutline,
      title: 'ListProducts',
      path: '/pages/product/list-products'
    },
    {
      icon: CubeOutline,
      title: 'UpdateProduct',
      path: '/pages/product/update-product'
    },
    {
      icon: CubeOutline,
      title: 'CreateEmployee',
      path: '/pages/employee/create-employee'
    },
    {
      icon: CubeOutline,
      title: 'UpdateEmployee',
      path: '/pages/employee/update-employee'
    },
    {
      icon: CubeOutline,
      title: 'ListEmployees',
      path: '/pages/employee/list-employees',      
    },
    {
      icon: CubeOutline,
      title: 'DashboardCustomer',
      path: '/pages/customer/dashboard'
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
  ]
}

export default navigation
