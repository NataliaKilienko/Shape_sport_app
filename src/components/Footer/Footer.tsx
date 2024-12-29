import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #1c1c1c, #0d0d0d)',
        color: '#FFFFFF',
        padding: '60px 20px',
        mt: 'auto',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        boxShadow: '0px -5px 15px rgba(0, 0, 0, 0.7)',
        borderTop: '3px solid #FFA500',
        transition: 'background 0.5s',
        '&:hover': {
          background: 'linear-gradient(180deg, #292929, #121212)',
        },
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
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#FFA500' }}>
            About SHAPE
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8, fontFamily: 'Roboto, sans-serif' }}>
            SHAPE is your ultimate partner in fitness. We're here to inspire you to push your limits and
            help you become the best version of yourself. Train smarter, stay motivated, and transform
            your fitness journey with us.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFA500', fontFamily: 'Roboto, sans-serif' }}>
            Contact Info
          </Typography>
          {[
            { label: 'Email', value: 'support@shape.com' },
            { label: 'Phone', value: '+123-456-7890' },
            { label: 'Address', value: '123 Shape Street, Fitness City, SH 45678' },
          ].map((info, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                fontFamily: 'Roboto, sans-serif',
                color: '#AAAAAA',
                mb: 1,
                cursor: 'pointer',
                transition: 'color 0.3s',
                '&:hover': { color: '#FFFFFF' },
              }}
            >
              <strong>{info.label}:</strong> {info.value}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFA500', fontFamily: 'Roboto, sans-serif' }}>
            Follow Us
          </Typography>
          <Box>
            {[Facebook, Instagram, Twitter, YouTube].map((Icon, index) => (
              <IconButton
                key={index}
                href="/"
                target="_blank"
                sx={{
                  color: '#FFA500',
                  mr: 1,
                  transition: 'transform 0.3s, color 0.3s',
                  '&:hover': { transform: 'scale(1.2)', color: '#FFFFFF', boxShadow: '0px 0px 10px #FFA500' },
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Typography
        variant="body2"
        sx={{
          mt: 4,
          fontStyle: 'italic',
          cursor: 'pointer',
          color: '#AAAAAA',
          fontFamily: 'Roboto, sans-serif',
          transition: 'color 0.3s',
          '&:hover': { color: '#FFFFFF' },
        }}
      >
        © {new Date().getFullYear()} SHAPE. All rights reserved. Empower Your Body, Achieve Your Goals.
      </Typography>
    </Box>
  );
};

export default Footer;
