import React, { useRef, useCallback } from 'react';
import {Button} from 'react-bootstrap';
import { useImages } from '../../../../hooks/images';
import { v4 } from 'uuid';

const AddImage: React.FC = () => {
  const { addImage } = useImages();

  const inputRef = useRef(null);

  const handleInputValueChange = useCallback(() => {
    const file = (inputRef.current as any).files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      addImage({
        id: v4(),
        name: file.name,
        base64Image: (reader.result as string)
      });
      console.log(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }, [addImage]);

  return (
    <Button className="m-2" variant="success" onClick={() => (inputRef.current as any).click()}>
      Adicionar imagem

      <input type="file"  hidden ref={inputRef} onChange={handleInputValueChange}
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"></input>

    </Button>
  );
};

export default AddImage;