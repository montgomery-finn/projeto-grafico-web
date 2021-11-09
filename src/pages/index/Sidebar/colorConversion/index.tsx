import React, { useCallback, useMemo, useState } from 'react';
import { ToggleButton, Button } from 'react-bootstrap';
import { Container, FormContainer, CheckboxContainer } from './styles';
import { useImages } from '../../../../hooks/images';
import { v4 } from 'uuid';
import { useToast } from '../../../../hooks/toast';
import { FaPalette } from 'react-icons/fa';
import { SubMenu } from 'react-pro-sidebar';

const ConversaoDeCor: React.FC = () => {

  const [radioValue, setRadioValue] = useState('RGB');

  const { selectedImage, addImage } = useImages();

  const radios = useMemo(() => [
    { name: 'RGB', value: 'RGB' },
    { name: 'HSV', value: 'HSV' },
    { name: 'XYZ', value: 'XYZ' },
    { name: 'HLS', value: 'HLS' },
    { name: 'YCrCb', value: 'YCrCb' },
    { name: 'Lab', value: 'Lab' },
    { name: 'Luv', value: 'Luv' },
  ], []);



  const {addToast} = useToast();

  const handleSubmit = useCallback(() => {
    fetch("https://localhost:44327/Conversion", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({base64Image: selectedImage?.base64Image ?? "", colorModel: radioValue}),
      method: "POST"
    }) 
    .then(res => res.json())
    .then(
      (result) => {
        const image = {
          id: v4(),
          name: (selectedImage?.name ?? "") + " - " + radioValue,
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
            id={`radio-${idx}`}
            type="radio"
            variant="outline-primary"
            name="radio"
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
      <SubMenu title="Conversão de cor" icon={<FaPalette />}>
        {form}
      </SubMenu>
    </Container>
  );
};

export default ConversaoDeCor;