// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

interface Product{
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  description: string;
  guarantyMonths: number; 
  quantity:number; 
}

interface FormListProductProps {
  products: Product[];
  startDate: Date | null;
  endDate: Date | null;
}

const TableListBestSellingProducts: React.FC<FormListProductProps> = ({ products,startDate,endDate }) => {

  const rows = products;

  /** GENERATE HTML **/
  const [htmlContent, setHtmlContent] = useState('');
  const [downloadOn, setDownloadOn] = useState(false);

const generateHtmlContent = () => {
  // Genera el contenido HTML basado en los datos de los productos
  const tableHtml = `          
    <table style="width:100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th colspan="7" style="padding: 10px; border: 1px solid #ddd; font-size: 20px; text-align: center;">Listado de los 10 productos más vendidos</th>
        </tr>
        <tr style="background-color: #f2f2f2;">
          <th colspan="7" style="padding: 10px; border: 1px solid #ddd; font-size: 16px; text-align: center;">Intervalo de tiempo entre: ${startDate} y ${endDate}</th>
        </tr>
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 10px; border: 1px solid #ddd; font-weight: bold; text-align: left;">ID</th>
          <th style="padding: 10px; border: 1px solid #ddd; font-weight: bold; text-align: left;">Nombre</th>
          <th style="padding: 10px; border: 1px solid #ddd; font-weight: bold; text-align: left;">Fabricante</th>
          <th style="padding: 10px; border: 1px solid #ddd; font-weight: bold; text-align: left;">Precio</th>
          <th style="padding: 10px; border: 1px solid #ddd; font-weight: bold; text-align: left;">Descripción</th>
          <th style="padding: 10px; border: 1px solid #ddd; font-weight: bold; text-align: left;">Meses de garantía</th>
          <th style="padding: 10px; border: 1px solid #ddd; font-weight: bold; text-align: left;">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(product => `
          <tr style="background-color: ${products.indexOf(product) % 2 === 0 ? '#f2f2f2' : 'white'};">
            <td style="padding: 10px; border: 1px solid #ddd;">${product.id}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${product.manufacturer}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${product.price}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${product.description}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${product.guarantyMonths}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${product.quantity}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;  
  setHtmlContent(tableHtml);
};

const openHtmlAsDownload = () => {
  generateHtmlContent();
  setDownloadOn(true);
};

useEffect(() => {
  // Descarga el HTML cuando htmlContent se actualice
  if (htmlContent !== '' && downloadOn == true) {
    // Crea un Blob con el contenido HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
  
    // Crea un enlace para descargar el Blob
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'productos_mas_vendidos.html'; // Nombre del archivo de descarga
    a.style.display = 'none';
  
    // Añade el enlace al DOM y haz clic automáticamente
    document.body.appendChild(a);
    a.click();
  
    // Limpia el enlace del DOM y libera el Blob
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadOn(false);
  }
}, [htmlContent,downloadOn]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Codigo de Producto</TableCell>
            <TableCell align='right'>Nombre</TableCell>
            <TableCell align='right'>Fabricante</TableCell>
            <TableCell align='right'>Descripcion</TableCell>
            <TableCell align='right'>Precio</TableCell>
            <TableCell align='right'>Garantia</TableCell>
            <TableCell align='right'>Cantidad Vendidos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell align='right'>{row.name}</TableCell>
              <TableCell align='right'>{row.manufacturer}</TableCell>
              <TableCell align='right'>{row.description}</TableCell>
              <TableCell align='right'>{row.price}</TableCell>
              <TableCell align='right'>{row.guarantyMonths}</TableCell>
              <TableCell align='right'>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={openHtmlAsDownload}>
        Exportar a HTML
      </Button>
    </TableContainer>
  )
}

export default TableListBestSellingProducts
