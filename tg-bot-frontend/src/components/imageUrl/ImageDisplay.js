import React from 'react';

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt="Dynamic" />
    </div>
  );
};

export default ImageDisplay;