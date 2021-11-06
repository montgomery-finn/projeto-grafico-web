import React, {createContext, useCallback, useContext, useState} from 'react';

interface Image {
  id: string;
  base64Image: string;
  name: string;
}

interface ImagesContextData {
  selectedImage: Image | null;
  setSelectedImage: (image: Image) => void;
  allImages: Image[];
  addImage: (image: Image) => void;
  removeImage: (image: Image) => void;
}

const ImagesContext = createContext<ImagesContextData>({} as ImagesContextData);

const ImagesProvider: React.FC = ({children}) => {

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const [allImages, setAllImages] = useState<Array<Image>>([]);

  const addImage = useCallback((image: Image) => {
    setAllImages((oldValue) => [...oldValue, image]);

    if(selectedImage == null){
      setSelectedImage(image);
    }
  }, [selectedImage]);

  const removeImage = useCallback((image: Image) => {
    setAllImages((oldValue) => {
      if(image.id === selectedImage?.id){
        setSelectedImage(null);
      }

      const indexToRemove = oldValue.findIndex((value) => value.id === image.id);
      const newArray = oldValue.splice(indexToRemove, 1);

      return newArray;
    });
  }, [selectedImage]);

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