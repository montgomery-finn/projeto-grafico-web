import React, { useCallback, useMemo, useState } from 'react';
import { ToggleButton, Button,  } from 'react-bootstrap';
import { Container, FormContainer, CheckboxContainer } from './styles';
import { useImages } from '../../../../hooks/images';
import { v4 } from 'uuid';
import { useToast } from '../../../../hooks/toast';
import { FaDiceOne } from 'react-icons/fa';
import { SubMenu } from 'react-pro-sidebar';

const Morphology: React.FC = () => {

  const [radioValue, setRadioValue] = useState('0');

  const radios = useMemo(() => [
    { name: 'Open', value: '0' },
    { name: 'Close', value: '1' },
  ], []);

  const { selectedImage, addImage } = useImages();

  const { addToast } = useToast();

  const handleSubmit = useCallback(() => {
    fetch("https://localhost:44327/Morphology", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({base64Image: selectedImage?.base64Image ?? "", morphology: radioValue}),
      method: "POST"
    }) 
    .then(res => res.json())
    .then(
      (result) => {
        console.log('aaa')
        const image = {
          id: v4(),
          name: (selectedImage?.name ?? "") + " - " + (radioValue === "0" ? "Open" : "Close"),
          base64Image: result
        }

        addImage(image);

      },
      (error) => {
        addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao converter a imagem"});
      }
    )
  }, [addImage, addToast, radioValue, selectedImage?.base64Image, selectedImage?.name]);

  const form = useMemo(() => (
    <FormContainer>
      <CheckboxContainer>
        {radios.map((radio, idx) => (
            <ToggleButton
              className="m-2"
              key={idx}
              id={`radio2-${idx}`}
              type="radio"
              variant="outline-primary"
              name="radio2"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
      </CheckboxContainer>
      

    <Button variant="success" onClick={handleSubmit}>Converter</Button>
  </FormContainer>
  ), [handleSubmit, radioValue, radios]);

  return (
    <Container>  
      <SubMenu title="Morfologia matemática" icon={<FaDiceOne />}>
        {form}
      </SubMenu>
    </Container>
  );
};

export default Morphology;