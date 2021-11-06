import React from 'react';
import {Container } from './styles';
import Sidebar from './Sidebar';
import Content from './Content';

const Index: React.FC = () => {
  
  return (
    <Container>
      <Sidebar />
      <Content />
    </Container>
  );
};

export default Index;