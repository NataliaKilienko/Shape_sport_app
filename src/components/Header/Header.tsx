import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        zIndex: 2,
        transition: 'background-color 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#FFA500',
              textShadow: '2px 2px 10px rgba(255, 140, 0, 0.8)',
            },
          }}
        >
          SHAPE
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              transition: 'color 0.3s ease, transform 0.3s ease',
              backgroundColor: 'transparent',
              '&:hover': {
                color: '#FFA500',
                transform: 'scale(1.1)',
                textShadow: '2px 2px 8px rgba(255, 140, 0, 0.8)',
              },
              '&:focus, &:active': {
                outline: 'none',
                boxShadow: 'none',
              },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/favorites"
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              transition: 'color 0.3s ease, transform 0.3s ease',
              backgroundColor: 'transparent',
              '&:hover': {
                color: '#FFA500',
                transform: 'scale(1.1)',
                textShadow: '2px 2px 8px rgba(255, 140, 0, 0.8)',
              },
              '&:focus, &:active': {
                outline: 'none',
                boxShadow: 'none',
              },
            }}
          >
            Favorites
          </Button>
          <Button
            component={Link}
            to="/workout-planner"
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              transition: 'color 0.3s ease, transform 0.3s ease',
              backgroundColor: 'transparent',
              '&:hover': {
                color: '#FFA500',
                transform: 'scale(1.1)',
                textShadow: '2px 2px 8px rgba(255, 140, 0, 0.8)',
              },
              '&:focus, &:active': {
                outline: 'none',
                boxShadow: 'none',
              },
            }}
          >
            Workout Planner
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
