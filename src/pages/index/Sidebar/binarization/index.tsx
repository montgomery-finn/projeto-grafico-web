import React, { useCallback, useMemo, useState } from 'react';
import { ToggleButton, Button } from 'react-bootstrap';
import { Container, FormContainer, CheckboxContainer } from './styles';
import { useImages } from '../../../../hooks/images';
import { v4 } from 'uuid';
import { useToast } from '../../../../hooks/toast';
import { FaYinYang } from 'react-icons/fa';
import { SubMenu } from 'react-pro-sidebar';
import Input from '../../../../Components/Input';

const Binarization: React.FC = () => {

  const { selectedImage, addImage } = useImages();

  const [threshold, setThreshold] = useState('');

  const { addToast } = useToast();

  const handleSubmit = useCallback(() => {
    fetch("https://localhost:44327/Binarization", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({base64Image: selectedImage?.base64Image ?? "", threshold}),
      method: "POST"
    }) 
    .then(res => res.json())
    .then(
      (result) => {
        const image = {
          id: v4(),
          name: (selectedImage?.name ?? "") + " - " + "Threshold",
          base64Image: result
        }

        addImage(image);
      },
      (error) => {
        addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao converter a imagem"});
      }
    )
  }, [addImage, addToast, selectedImage?.base64Image, selectedImage?.name, threshold]);

  const form = useMemo(() => (
    <FormContainer>
     <Input 
        name="Threshold (int) (0 = OTSU)" 
        placeholder="Threshold (int) (0 = OTSU)" 
        value={threshold} 
        onValueChange={(value) => setThreshold(value)} 
      />
      
    <Button variant="success" onClick={handleSubmit}>Converter</Button>
  </FormContainer>
  ), [handleSubmit, threshold]);

  return (
    <Container>  
      <SubMenu title="Binarização Threshold" icon={<FaYinYang />}>
        {form}
      </SubMenu>
    </Container>
  );
};

export default Binarization;