import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Favorites', to: '/favorites' },
    { label: 'Workout Planner', to: '/workout-planner' },
    { label: 'Contact Us', to: '/contact' },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolling ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
          boxShadow: scrolling ? '0px 4px 15px rgba(0, 0, 0, 0.3)' : 'none',
          transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
          zIndex: 2,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'color 0.3s ease, text-shadow 0.3s ease',
              '&:hover': {
                color: '#FFA500',
                textShadow: '2px 2px 10px rgba(255, 165, 0, 0.8)',
              },
            }}
          >
            SHAPE
          </Typography>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 4,
            }}
          >
            {navItems.map((item, index) => (
              <Button
                key={index}
                component={Link}
                to={item.to}
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  backgroundColor: 'transparent',
                  border: '2px solid transparent',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#FFA500',
                    borderColor: '#FFA500',
                    transform: 'scale(1.1)',
                    textShadow: '2px 2px 8px rgba(255, 140, 0, 0.8)',
                  },
                  '&:focus, &:active': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' }, color: '#FFFFFF' }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#1e1e2f',
            color: '#FFFFFF',
            width: '240px',
          },
        }}
      >
        <Box
          sx={{
            width: 240,
            textAlign: 'center',
            paddingY: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#FFA500',
              marginBottom: 3,
            }}
          >
            SHAPE
          </Typography>
          <List>
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    textAlign: 'center',
                    '&:hover': {
                      backgroundColor: '#FFA500',
                      color: '#1e1e2f',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
