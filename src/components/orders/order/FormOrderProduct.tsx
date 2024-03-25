import { Autocomplete, Button, FormHelperText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { CardForm } from 'src/components/generic/forms/CardForm'
import { GridItemForm } from 'src/components/generic/forms/GridItemForm'

import { Products_Stock, Stock_Store } from "src/pages/api/sale/stockProducts";


export interface AutocompleteProducts {
  label: string,
  idProduct: string;
  name: string;
  price: number;
  storeCode: string;
  stock: number
}

const transformProducts = (store_code: string) => (product: Products_Stock) => {
  const store = product.stores.find(store => store.storeCode === store_code && store.stock > 0);
  if (!store) {
    return null; // If no store matches the criteria, return null
  }
  return {
    label: product.name,
    idProduct: product.idProduct,
    name: product.name,
    price: product.price,
    storeCode: store.storeCode,
    stock: store.stock
  };
}

export const FormOrderProduct = (props: any) => {
  const store_code = props.selectedStore;
  const products = props.products.map(transformProducts(store_code)).filter((product: any) => product !== null);
  // console.log(products)
  const [selectedProduct, setSelectedProduct] = useState<AutocompleteProducts | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnitPrice] = useState(0); // Change for the selectedProduct
  const [stock, setStock] = useState(0);

  const handleQuantityChange = (event: any) => {
    setQuantity(Number(event.target.value));
  };

  const handleOnChangeAutocomplete = (event: any, newValue: any | null) => {
    setSelectedProduct(newValue);
    if (newValue) {
      setUnitPrice(newValue.price)
      setStock(newValue.stock);
    } else {
      setUnitPrice(0)
    }
  }

  const handleFormAddProduct = () => {
    if (selectedProduct !== null) {
      // console.log(selectedProduct)
      // const selectedProductObject = props.products.find(
      //   (product: Products_Stock) => product.idProduct === selectedProduct.idProduct
      // );
      props.addProduct(selectedProduct, quantity, stock);
      // console.log(selectedProductObject, quantity, stock);
    }
  };

  return (
    <CardForm title='Agregar Producto' >
      <GridItemForm >
        <Autocomplete
          value={selectedProduct}
          onChange={handleOnChangeAutocomplete}
          disablePortal
          id="form-order-product-combo"
          options={products}
          renderInput={(params) => <TextField {...params} label="Producto" />}
        />
        {selectedProduct !== null && (
          <FormHelperText id="form-invoice-product-select-helper">
            Existencias disponibles: {stock}
          </FormHelperText>
        )}
      </GridItemForm>
      <GridItemForm md={3} >
        <TextField
          fullWidth
          type="number"
          label="Cantidad"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="1"
        />
      </GridItemForm>
      <GridItemForm md={3} >
        <TextField
          fullWidth
          label="Precio unitario"
          value={`Q.   ${unit}`} // Format with unit prefix
          disabled
          placeholder="1"
        />
      </GridItemForm>
      <GridItemForm>
        <Button onClick={handleFormAddProduct} size="large" type="submit" sx={{ mr: 2 }} variant="outlined">
          Agregar
        </Button>
      </GridItemForm>
    </CardForm>
  )
}
