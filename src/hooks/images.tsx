import React, {createContext, useCallback, useContext, useState} from 'react';
import DefaultImage from './defaultImage';
import {v4} from 'uuid';

interface Image {
  id: string;
  base64Image: string;
  name: string;
}

interface ImagesContextData {
  selectedImage: Image;
  setSelectedImage: (image: Image) => void;
  allImages: Image[];
  addImage: (image: Image) => void;
  removeImage: (image: Image) => void;
}

const ImagesContext = createContext<ImagesContextData>({} as ImagesContextData);

const defaultImage = {id: v4(), base64Image: DefaultImage, name: "Original"}

const ImagesProvider: React.FC = ({children}) => {

  const [selectedImage, setSelectedImage] = useState<Image>(defaultImage);

  const [allImages, setAllImages] = useState([defaultImage]);

  const addImage = useCallback((image: Image) => {
    setAllImages((oldValue) => [...oldValue, image]);
  }, [setAllImages]);

  const removeImage = useCallback((image: Image) => {
    setAllImages((oldValue) => {
      const indexToRemove = oldValue.findIndex((value) => value === image);

      const newArray = oldValue.splice(indexToRemove, 1);

      return newArray;
    });
  }, []);

  return (
    <ImagesContext.Provider
      value={{
        selectedImage,
        setSelectedImage: (image) => setSelectedImage(image),
        allImages,
        addImage,
        removeImage
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
}

export default ImagesProvider;

export function useImages(): ImagesContextData {
  const context = useContext(ImagesContext);
  return context;
}