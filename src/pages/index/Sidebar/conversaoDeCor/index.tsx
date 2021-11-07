import { CNavItem, CNavGroup } from '@coreui/react';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useMemo, useState } from 'react';
import { ToggleButton, Button } from 'react-bootstrap';
import { Container, FormContainer, CheckboxContainer } from './styles';
import { useImages } from '../../../../hooks/images';
import { v4 } from 'uuid';

const ConversaoDeCor: React.FC = () => {

  const [radioValue, setRadioValue] = useState('RGB');

  const { selectedImage, addImage, setSelectedImage } = useImages();

  const radios = useMemo(() => [
    { name: 'RGB', value: 'RGB' },
    { name: 'HSV', value: 'HSV' },
    { name: 'XYZ', value: 'XYZ' },
    { name: 'HLS', value: 'HLS' },
    { name: 'YCrCb', value: 'YCrCb' },
    { name: 'Lab', value: 'Lab' },
    { name: 'Luv', value: 'Luv' },
  ], []);


  const toggler = useMemo(() => (
    <div>
      <FontAwesomeIcon icon={faPalette} />
      <span style={{marginLeft: 14}}>Conversão de cor</span>
    </div>
  ), []);

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
          name: (selectedImage?.name ?? "") + radioValue,
          base64Image: "data:image/jpeg;base64," + result
        }

        addImage(image);

        setSelectedImage(image);
      },
      (error) => {
        console.log("Erro => ", error);
      }
    )
  }, [addImage, radioValue, selectedImage?.base64Image, selectedImage?.name, setSelectedImage]);

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
        <CNavGroup toggler={toggler}>
          <CNavItem href="#">
            {form}
          </CNavItem>
        </CNavGroup>
    </Container>
  );
};

export default ConversaoDeCor;