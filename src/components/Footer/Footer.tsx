import React from 'react';
import { Box, Typography, Link, IconButton, Grid } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#0D0D0D',
        color: '#FFFFFF',
        padding: '60px 20px',
        mt: 'auto',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        boxShadow: '0px -5px 15px rgba(0, 0, 0, 0.7)',
        borderTop: '2px solid #FFA500',
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          animation: 'fadeIn 2s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }}
      >
        <Grid item xs={12} sm={4} sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#FFA500' }}>
            About SHAPE
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8, fontFamily: 'Roboto, sans-serif' }}>
            SHAPE is your ultimate partner in fitness. We're here to inspire you to push your limits and
            help you become the best version of yourself. Train smarter, stay motivated, and transform
            your fitness journey with us.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={3} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFA500', fontFamily: 'Roboto, sans-serif' }}>
            Quick Links
          </Typography>
          <Link href="/" color="inherit" underline="none" sx={{ display: 'block', mb: 1, transition: 'color 0.3s', '&:hover': { color: '#FFA500' }, fontFamily: 'Roboto, sans-serif' }}>
            Home
          </Link>
          <Link href="/favorites" color="inherit" underline="none" sx={{ display: 'block', mb: 1, transition: 'color 0.3s', '&:hover': { color: '#FFA500' }, fontFamily: 'Roboto, sans-serif' }}>
            Favorites
          </Link>
          <Link href="/contact" color="inherit" underline="none" sx={{ display: 'block', mb: 1, transition: 'color 0.3s', '&:hover': { color: '#FFA500' }, fontFamily: 'Roboto, sans-serif' }}>
            Contact Us
          </Link>
        </Grid>

        <Grid item xs={12} sm={3} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFA500', fontFamily: 'Roboto, sans-serif' }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton href="https://facebook.com" target="_blank" sx={{ color: '#FFA500', mr: 1, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.15)', color: '#FFFFFF' } }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" sx={{ color: '#FFA500', mr: 1, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.15)', color: '#FFFFFF' } }}>
              <Instagram />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#FFA500', mr: 1, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.15)', color: '#FFFFFF' } }}>
              <Twitter />
            </IconButton>
            <IconButton href="https://youtube.com" target="_blank" sx={{ color: '#FFA500', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.15)', color: '#FFFFFF' } }}>
              <YouTube />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic', color: '#AAAAAA', fontFamily: 'Roboto, sans-serif' }}>
        © {new Date().getFullYear()} SHAPE. All rights reserved. Empower Your Body, Achieve Your Goals.
      </Typography>
    </Box>
  );
};

export default Footer;
