import { CImage } from '@coreui/react';
import React from 'react';
import {Container} from './styles';
import { useImages } from '../../../../hooks/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const Image: React.FC = () => {

  const {selectedImage} = useImages();

  return (
    <Container>
      {selectedImage ? 
        <CImage fluid src={selectedImage.base64Image} /> :
        <FontAwesomeIcon icon={faImage} size="10x"/>
      }
      
    </Container>
  );
}

export default Image;