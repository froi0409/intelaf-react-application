import axios from 'axios';
export async function getProductById(idProduct: string): Promise<any> {
  try {
    const url = `http://localhost:3000/api/product/findProductById?idProduct=${idProduct}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    //console.log(error);
    throw new Error('Error al obtener el producto con el id: ' + idProduct);
  }
}