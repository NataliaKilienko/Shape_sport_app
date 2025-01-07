import React from 'react';

const ImageBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: `url(/Shape_sport_app/bg.jpg)`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        filter: 'brightness(30%)',
      }}
    ></div>
  );
};

export default ImageBackground;
