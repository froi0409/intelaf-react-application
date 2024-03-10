// ** React Imports

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Product } from "src/pages/sales/add-invoice";

const FormInvoiceProduct = (props: any) => {
  const products = props.products;

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnitPrice] = useState(0); // Change for the selectedProduct

  const handleProductChange = (event: any) => {
    setSelectedProduct(event.target.value);

    // Find the selected product from the props.products array
    const selectedProductObject = props.products.find(
      (product: Product) => product.id_product === event.target.value
    );

    // Update unit price based on the selected product (if found)
    if (selectedProductObject) {
      setUnitPrice(selectedProductObject.price);
    } else {
      setUnitPrice(0); // Handle cases where the product is not found
    }
  };

  const handleQuantityChange = (event: any) => {
    setQuantity(Number(event.target.value));
  };

  const handleFormAddProduct = (e: any) => {
    e.preventDefault();
    if (selectedProduct !== "") {
      const selectedProductObject = props.products.find(
        (product: Product) => product.id_product === selectedProduct
      );
      props.addProduct(selectedProductObject, quantity);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Agregar Producto"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleFormAddProduct}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="form-invoice-product-select-label">
                  Producto
                </InputLabel>
                <Select
                  label="Producto" // Use Spanish for consistency
                  value={selectedProduct}
                  onChange={handleProductChange}
                  id="form-invoice-product-select"
                  labelId="form-invoice-product-select-label"
                >
                  {props.products.map((product: any) => (
                    <MenuItem
                      key={product.id_product}
                      value={product.id_product}
                    >
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                label="Cantidad"
                value={quantity}
                onChange={handleQuantityChange}
                placeholder="1"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Precio unitario"
                value={`Q.   ${unit}`} // Format with unit prefix
                disabled
                placeholder="1"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="large" type="submit" sx={{ mr: 2 }} variant="outlined">
            Agregar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormInvoiceProduct;
