import React, { useRef, useCallback } from 'react';
import {Button} from 'react-bootstrap';
import { useImages } from '../../../../hooks/images';
import { v4 } from 'uuid';
import { useToast } from '../../../../hooks/toast';

const AddImage: React.FC = () => {
  const { addImage } = useImages();

  const {addToast} = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputValueChange = useCallback(() => {
    console.log("chegou aqui")
    try{

      if(inputRef.current && inputRef.current.files){
        const file = inputRef.current.files[0];

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
            console.log("aaa")
            addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao selecionar imagem"});
        };

        inputRef.current.value = "";
      }
    } catch {
      console.log("aaa")
      addToast({type: 'danger', title: "Erro", description: "Ocorreu um erro ao selecionar imagem"});
    }
    
  }, [addImage, addToast]);

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