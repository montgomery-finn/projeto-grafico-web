import React from 'react';
import Index from './pages/index';
import ImagesProvider from './hooks/images';
import {ToastProvider} from './hooks/toast';

const App: React.FC = () => (
  <ToastProvider>
    <ImagesProvider>
      <Index />
    </ImagesProvider>
  </ToastProvider>
  
);

export default App;
