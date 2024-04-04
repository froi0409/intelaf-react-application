import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardMedia from '@mui/material/CardMedia';
import { getCookieJwt } from 'src/utils/cookieUtils';

const CardImageDashboard: React.FC<{ idProduct: string }> = ({ idProduct }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/v1/images/image-by-idProduct/${idProduct}`, {
          responseType: 'blob',
          headers: {
            Authorization: getCookieJwt()
          }
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
        console.log(imageSrc);
      } catch (error) {
        console.error('Failed to fetch image:', error);
      }
    };

    fetchImage();    
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [idProduct]);

  return (
    <div>      
      {imageSrc ? (        
        <CardMedia sx={{ height: '9.375rem' }} image={imageSrc} />
      ) : (
        <CardMedia sx={{ height: '9.375rem' }} image='/images/imagotipo.png' />
      )}
    </div>
  );
};

export default CardImageDashboard;