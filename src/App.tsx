import React from 'react';
import Index from './pages/index';
import ImagesProvider from './hooks/images';

const App: React.FC = () => (
  <ImagesProvider>
    <Index />
  </ImagesProvider>
);

export default App;
