// ** React Imports
//import { useState, ChangeEvent } from 'react'
import * as React from 'react';
import { useState, Fragment } from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'
import CardProduct from './CardProduct';


interface Column {
  id: 'idProduct' | 'name' | 'manufacturer' | 'price' | 'description' | 'guarantyMonths'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'idProduct', label: 'Codigo Producto'},
  { id: 'name', label: 'Nombre'},
  { id: 'manufacturer', label: 'Fabricante'},
  { id: 'price', label: 'Precio'},
  { id: 'description', label: 'Descripcion'},
  { id: 'guarantyMonths', label: 'Garantia (Meses)'},  
  
]

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

interface CatalogProductProps {
  products: Product[];
}


const CustomerCatalog: React.FC<CatalogProductProps> = ({ products }) => {
    // console.log(props.dataServer);
  const rows = products;

  return (
    <Grid container spacing={6}>
        {
        products.map(product =>  {
          return (        
            <Grid item xs={12} sm={6} md={4}>
                <CardProduct product={product}/>            
            </Grid> 
          )
          })
        }
    </Grid>
  );
}
export default CustomerCatalog