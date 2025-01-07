import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BottomBar: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToContacts = () => {
    navigate('/contact'); 
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: { xs: '10px 20px', sm: '15px 30px' },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#FFFFFF',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 0 },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '0.9rem', sm: '1.2rem' },
          maxWidth: { xs: '100%', sm: '70%' },
          textAlign: { xs: 'center', sm: 'left' },
          lineHeight: 1.4,
          animation: 'fadeInBottomText 2s ease-in-out',
          '@keyframes fadeInBottomText': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        Got questions or need assistance? Contact us today and let us help you achieve your fitness goals.
      </Typography>
      <Button
        variant="outlined"
        color="warning"
        onClick={handleGoToContacts}
        sx={{
          color: 'white',
          borderColor: '#FFA500',
          padding: { xs: '8px 20px', sm: '10px 25px' },
          fontWeight: 'bold',
          fontSize: { xs: '0.8rem', sm: '1rem' },
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(255, 140, 0, 0.4)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#FFA500',
            color: '#000000',
            boxShadow: '0 6px 16px rgba(255, 140, 0, 0.6)',
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(1)',
            boxShadow: '0 2px 8px rgba(255, 140, 0, 0.3)',
          },
        }}
      >
        CONTACT US
      </Button>
    </Box>
  );
};

export default BottomBar;
