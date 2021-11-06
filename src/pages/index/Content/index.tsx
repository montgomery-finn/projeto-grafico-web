import React from 'react';
import {Container} from './styles';
import Image from './Image';
import List from './List';

const Content: React.FC = () => {

  return (
    <Container>
      <Image />
      <List />
    </Container>
  );
}

export default Content;