import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroContent: React.FC = () => {
  const handleGetStarted = () => {
    const exerciseList = document.getElementById('exercise-list'); 
    if (exerciseList) {
      exerciseList.scrollIntoView({ behavior: 'smooth' }); 
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#FFFFFF',
        zIndex: 1,
        padding: '0 20px',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          color: '#FFA500',
          textShadow: '3px 3px 12px rgba(0, 0, 0, 0.8)',
          fontSize: { xs: '2.5rem', md: '5rem' },
          mb: 2,
          animation: 'fadeInTitle 1.5s ease-in-out',
          '@keyframes fadeInTitle': {
            '0%': { opacity: 0, transform: 'scale(0.8)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
        }}
      >
        SHAPE
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: '#FFFFFF',
          marginBottom: '25px',
          fontSize: { xs: '1rem', md: '1.5rem' },
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.9)',
          animation: 'fadeInSubtitle 2s ease-in-out',
          '@keyframes fadeInSubtitle': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }}
      >
        Empower Your Body, Achieve Your Goals
      </Typography>
      <Button
        variant="contained"
        onClick={handleGetStarted} 
        sx={{
          position: 'relative',
          color: '#FFFFFF',
          fontWeight: 'bold',
          padding: { xs: '10px 20px', md: '15px 35px' }, 
          fontSize: { xs: '1rem', md: '1.2rem' }, 
          borderRadius: '30px',
          backgroundColor: '#FFA500',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)',
          boxShadow: '0 6px 15px rgba(255, 140, 0, 0.5)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          animation: 'pulse 3s infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' },
          },
          '&:hover': {
            backgroundColor: '#FF8C00',
            transform: 'scale(1.1)',
            boxShadow: '0 8px 30px rgba(255, 140, 0, 0.7)',
          },
          '&:active': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 20px rgba(255, 140, 0, 0.4)',
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
            zIndex: 1,
            transition: 'all 0.5s ease-in-out',
          },
          '&:hover:before': {
            left: '100%',
          },
        }}
      >
        <Typography
          component="span"
          sx={{
            position: 'relative',
            zIndex: 2,
            fontWeight: 'bold',
          }}
        >
          GET STARTED
        </Typography>
      </Button>
    </Box>
  );
};

export default HeroContent;
