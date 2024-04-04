import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material';
import { getCookieJwt } from 'src/utils/cookieUtils';

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
    height: '14rem',
    borderRadius: theme.shape.borderRadius
  }))

const ImageComponentDetail: React.FC<{ idProduct: string }> = ({ idProduct }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/v1/images/image-by-idProduct/${idProduct}`, {
          responseType: 'blob', // Indica que la respuesta es una imagen
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

    // Limpia la URL del objeto al desmontar el componente para evitar memory leaks
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [idProduct]);
  
    return (
      <div>        
        {imageSrc ? (
          <Img src={imageSrc} alt={`Product ${idProduct}`} />
        ) : (
            <Img alt='Not found' src='/images/imagotipo.png' />
        )}        
      </div>
    );
};

export default ImageComponentDetail;