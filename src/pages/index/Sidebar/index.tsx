import React from 'react';
import { CNavGroup, CNavItem, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import ConversaoDeCor from './conversaoDeCor';
import {Brand} from './styles';
import AddImage from './addImage';


const SideBar: React.FC = () => {
  
  return (
    <CSidebar className="h-100">
      <CSidebarBrand><Brand>Projeto gráfico</Brand></CSidebarBrand>
      <CSidebarNav>

        <AddImage />

        <ConversaoDeCor />

        <CNavItem href="#">
          Filtro
        </CNavItem>

        <CNavItem href="#">
          Detector de borda
        </CNavItem>

        <CNavItem href="#">
          Binarização
        </CNavItem>

        <CNavItem href="#">
          Morfologia matemática
        </CNavItem>
      
      </CSidebarNav>
      <CSidebarToggler />
    </CSidebar>
    );
}

export default SideBar;