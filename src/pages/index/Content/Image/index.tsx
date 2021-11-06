import { CImage } from '@coreui/react';
import React from 'react';
import {Container} from './styles';
import { useImages } from '../../../../hooks/images';

const Image: React.FC = () => {

  const {selectedImage} = useImages();

  return (
    <Container>
      <CImage fluid src={selectedImage.base64Image} />
    </Container>
  );
}

export default Image;