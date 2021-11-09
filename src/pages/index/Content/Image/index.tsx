import React from 'react';
import {Container} from './styles';
import { useImages } from '../../../../hooks/images';
import { Image as BootstrapImage } from 'react-bootstrap';
import {FaImage} from 'react-icons/fa';

const Image: React.FC = () => {

  const {selectedImage} = useImages();

  return (
    <Container>
      {selectedImage ? 
        <BootstrapImage fluid src={selectedImage.base64Image} /> :
        <FaImage size={320}/>
      }
      
    </Container>
  );
}

export default Image;