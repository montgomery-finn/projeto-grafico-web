import React from 'react';
import {Brand} from './styles';
import AddImage from './addImage';
import ColorConversion from './colorConversion';
import BilateralFilter from './bilateralFilter';
import { ProSidebar, Menu, MenuItem, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import CannyBorder from './cannyBorder';
import Binarization from './binarization';
import Morphology from './morphology';

const SideBar: React.FC = () => {
  
  return (
    <ProSidebar>
      <SidebarHeader>
        <Brand>Projeto gráfico</Brand>
      </SidebarHeader>
      <Menu iconShape="round">  
        <AddImage />
        
        <ColorConversion />
        
        <BilateralFilter />

        <CannyBorder />
        
        <Binarization />

        <Morphology />
      </Menu>
    </ProSidebar>
    );
}

export default SideBar;