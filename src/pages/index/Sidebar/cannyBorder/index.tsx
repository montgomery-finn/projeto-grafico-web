import React, { useCallback, useMemo, useState } from 'react';
import { ToggleButton, Button } from 'react-bootstrap';
import { Container, FormContainer, CheckboxContainer } from './styles';
import { useImages } from '../../../../hooks/images';
import { v4 } from 'uuid';
import { useToast } from '../../../../hooks/toast';
import { FaCropAlt } from 'react-icons/fa';
import { SubMenu } from 'react-pro-sidebar';
import Input from '../../../../Components/Input';

const CannyBorder: React.FC = () => {

  const [threshold1, setThreshold1] = useState('50');
  const [threshold2, setThreshold2] = useState('150');

  const { selectedImage, addImage } = useImages();

  const { addToast } = useToast();

  const handleSubmit = useCallback(() => {
    fetch("https://localhost:44327/Border", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({base64Image: selectedImage?.base64Image ?? "", threshold1, threshold2}),
      method: "POST"
    }) 
    .then(res => res.json())
    .then(
      (result) => {
        const image = {
          id: v4(),
          name: (selectedImage?.name ?? "") + " - " + "Canny",
          base64Image: result
        }

        addImage(image);

      },
      (error) => {
        addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao converter a imagem"});
      }
    )
  }, [addImage, addToast, selectedImage?.base64Image, selectedImage?.name, threshold1, threshold2]);

  const form = useMemo(() => (
    <FormContainer>
     <Input 
        name="Threshold 1 (double)" 
        placeholder="Threshold 1 (double)" 
        value={threshold1} 
        onValueChange={(value) => setThreshold1(value)} 
      />
      
      <Input 
        name="Threshold 2 (double)" 
        placeholder="Threshold 2 (double)" 
        value={threshold2} 
        onValueChange={(value) => setThreshold2(value)} 
        />
    <Button variant="success" onClick={handleSubmit}>Converter</Button>
  </FormContainer>
  ), [handleSubmit, threshold1, threshold2]);

  return (
    <Container>  
      <SubMenu title="Detector de borda Canny" icon={<FaCropAlt />}>
        {form}
      </SubMenu>
    </Container>
  );
};

export default CannyBorder;