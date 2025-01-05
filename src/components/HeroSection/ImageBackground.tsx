import React from 'react';
import backgroundImage from '../../assets/images/bg.jpg'; 

const ImageBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        filter: 'brightness(30%)',
      }}
    ></div>
  );
};

export default ImageBackground;
