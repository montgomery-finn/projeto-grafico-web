import { CNavItem, CNavGroup } from '@coreui/react';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo, useState } from 'react';
import { ToggleButton, Button } from 'react-bootstrap';
import { Container, FormContainer, CheckboxContainer } from './styles';

const ConversaoDeCor: React.FC = () => {

  const [radioValue, setRadioValue] = useState('1');

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
    <Button variant="success">Converter</Button>
  </FormContainer>
  ), [radioValue, radios]);

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