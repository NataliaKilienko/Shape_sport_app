import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const BottomBar: React.FC = () => {
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
        Ready to transform your fitness journey? Join us and become the strongest version of yourself.
      </Typography>
      <Button
        variant="outlined"
        color="warning"
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
        LEARN MORE
      </Button>
    </Box>
  );
};

export default BottomBar;
