import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import {Container} from './styles';
import { useImages } from '../../../../hooks/images';
import { Button } from 'react-bootstrap';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List: React.FC = () => {

  const {allImages, removeImage, setSelectedImage} = useImages();

  return (
    <Container>
      <CTable striped hover align="middle" responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col" className="w-30">#</CTableHeaderCell>
          <CTableHeaderCell scope="col" className="w-30">Nome</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
  
        <CTableBody>
          {allImages.map((image, index) => (
            <CTableRow key={image.id} onClick={() => setSelectedImage(image)}>
              <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
              <CTableDataCell>{image.name}</CTableDataCell>
              <CTableDataCell>
                <Button variant="danger" onClick={() => {removeImage(image)}}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>

      </CTable>
    </Container>
  );
}

export default List;