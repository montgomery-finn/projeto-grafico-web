import React from 'react';
import { CNavGroup, CNavItem, CNavTitle, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

const SideBar: React.FC = () => {

  return (
    <CSidebar className="h-100">
      <CSidebarBrand>Sidebar Brand</CSidebarBrand>
      <CSidebarNav>
        <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href="#">
        <FontAwesomeIcon icon={faPalette} />
          Nav item
        </CNavItem>
        <CNavItem href="#">
          With badge
        </CNavItem>
        <CNavGroup toggler="asdasd">
          <CNavItem href="#">
            Nav dropdown item
          </CNavItem>
          <CNavItem href="#">
            Nav dropdown item
          </CNavItem>
        </CNavGroup>
      </CSidebarNav>
      <CSidebarToggler />
    </CSidebar>
    );
}

export default SideBar;