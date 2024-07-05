import React from 'react';

const ImageDisplay = ({ imageUrl }) => {
  return (
      <div>
          <img src={imageUrl} alt="Изображение" />
      </div>
  );
};

export default ImageDisplay;