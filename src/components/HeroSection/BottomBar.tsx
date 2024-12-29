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
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#FFFFFF',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.2rem',
          maxWidth: '70%',
          lineHeight: 1.5,
          '@media (max-width: 600px)': {
            fontSize: '1rem',
            maxWidth: '100%',
            textAlign: 'center',
          },
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
          padding: '10px 25px',
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: '20px',
          boxShadow: '0 4px 10px rgba(255, 140, 0, 0.5)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#FFA500',
            color: '#000000',
            boxShadow: '0 6px 20px rgba(255, 140, 0, 0.7)',
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(1)',
            boxShadow: '0 2px 10px rgba(255, 140, 0, 0.4)',
          },
        }}
      >
        CONTACT US
      </Button>
    </Box>
  );
};

export default BottomBar;
