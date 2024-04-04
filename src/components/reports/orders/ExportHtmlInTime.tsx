import { Button } from '@mui/material';
import React, { Fragment, useState } from 'react'
import { InTimePendingVerifyStructure } from 'src/pages/reports/orders/in-time-pending-verify';

interface getprops {
  data: InTimePendingVerifyStructure[];
  title : string;
  subtitle : string;
  nameDownload : string;
}

export const ExportHtmlInTime = ({data, title, subtitle, nameDownload}: getprops) => {
  /* GENERATE HTML*/

  const [htmlContent, setHtmlContent] = useState('');
  const [downloadOn, setDownloadOn] = useState(false);

  const generateHtmlContent = (data: InTimePendingVerifyStructure[]) => {
    // Genera el contenido HTML basado en los datos de las ventas
    let tableHtml = `
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          h1 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 auto;
          }
          th, td {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          ul li {
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <h3>${subtitle}</h3>
        <table>
          <thead>
            <tr>
              <th>Código Orden</th>
              <th>tienda que envía</th>
              <th>tienda que recibe</th>
              <th>Fecha de salida</th>
              <th>Fecha estimada</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
    `;

    data.forEach(data => {
      tableHtml += `
      <tr>
        <td>${data.idOrder}</td>
        <td>${data.nameStoreShipping}</td>
        <td>${data.nameStoreReceive}</td>
        <td>${data.dateDeparture}</td>
        <td>${data.estimatedDeliveryDate}</td>
        <td>Q.${data.total}</td>
        <td>${data.status}</td>
  `;

      tableHtml += `
    </tr>
  `;
    });

    tableHtml += `
        </tbody>
      </table>
    </body>
  </html>
`;

    setHtmlContent(tableHtml);
  };

  React.useEffect(() => {
    // Descarga el HTML cuando htmlContent se actualice
    if (htmlContent !== '' && downloadOn == true) {
      // Crea un Blob con el contenido HTML
      const blob = new Blob([htmlContent], { type: 'text/html' });

      // Crea un enlace para descargar el Blob
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = nameDownload + '.html'; // Nombre del archivo de descarga
      a.style.display = 'none';

      // Añade el enlace al DOM y haz clic automáticamente
      document.body.appendChild(a);
      a.click();

      // Limpia el enlace del DOM y libera el Blob
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadOn(false);
    }
  }, [htmlContent, downloadOn]);

  const openHtmlAsDownload = () => {
    generateHtmlContent(data);
    setDownloadOn(true);
  };

  return (
    <Button variant="contained" color="primary" onClick={openHtmlAsDownload} >
      Exportar a HTML
    </Button>
  )
}
