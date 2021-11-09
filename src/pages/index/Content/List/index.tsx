import React from 'react';
import {Container} from './styles';
import { useImages } from '../../../../hooks/images';
import { Button, Table } from 'react-bootstrap';
import {FaTrashAlt} from 'react-icons/fa';

const List: React.FC = () => {

  const {allImages, removeImage, setSelectedImage, selectedImage} = useImages();

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allImages.map((image, index) => (
              <tr key={image.id} onClick={() => setSelectedImage(image)}
                className={image.id === selectedImage?.id ? "bg-info" : ""}>
                <td >{index+1}</td>
                <td>{image.name}</td>
                <td>
                  <Button variant="danger" onClick={() => {removeImage(image)}}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}

        </tbody>
      </Table>
    </Container>
  );
}

export default List;