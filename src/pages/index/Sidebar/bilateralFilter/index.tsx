
import React, { useCallback, useMemo, useState } from 'react';
import { Container, FormContainer } from './styles';
import { useImages } from '../../../../hooks/images';
import { v4 } from 'uuid';
import Input from '../../../../Components/Input';
import { Button } from 'react-bootstrap';
import { useToast } from '../../../../hooks/toast';
import { SubMenu } from 'react-pro-sidebar';
import { FaRegBellSlash } from 'react-icons/fa';

const BilateralFilter: React.FC = () => {

  const { selectedImage, addImage } = useImages();
  const [d, setD] = useState('30');
  const [sigmaColor, setSigmaColor] = useState('150');
  const [sigmaSpace, setSigmaSpace] = useState('150');

  const {addToast} = useToast();

  const handleSubmit = useCallback(() => {
    fetch("https://localhost:44327/Filter", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({base64Image: selectedImage?.base64Image ?? "", d, sigmaColor, sigmaSpace}),
      method: "POST"
    }) 
    .then(res => res.json())
    .then(
      (result) => {
        const image = {
          id: v4(),
          name: (selectedImage?.name ?? "") + " - Filtro bilateral",
          base64Image: result
        }

        addImage(image);
      },
      (error) => {
        addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao converter a imagem"});
      }
    )
  }, [addImage, d, selectedImage, sigmaColor, sigmaSpace, addToast]);

  const form = useMemo(() => (
    <FormContainer>
      <Input 
        name="d (int)" 
        placeholder="d (int)" 
        value={d} 
        onValueChange={(value) => setD(value)} 
      />
      
      <Input 
        name="Sigma Color (double)" 
        placeholder="Sigma Color (double)" 
        value={sigmaColor} 
        onValueChange={(value) => setSigmaColor(value)} 
        />

      <Input 
        name="Sigma Space (double)" 
        placeholder="Sigma Space (double)" 
        value={sigmaSpace} 
        onValueChange={(value) => setSigmaSpace(value)} 
        />

    <Button variant="success" onClick={handleSubmit}>Converter</Button>
  </FormContainer>
  ), [d, handleSubmit, sigmaColor, sigmaSpace]);

  return (
    <Container>
      <SubMenu title="Filtro bilateral" icon={<FaRegBellSlash />}>
        {form}
      </SubMenu>
    </Container>
  );
};

export default BilateralFilter;