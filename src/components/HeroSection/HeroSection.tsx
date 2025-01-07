import React from 'react';
import { Box } from '@mui/material';
import VideoBackground from './VideoBackground';
import HeroContent from './HeroContent';
import BottomBar from './BottomBar';

const HeroSection: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <VideoBackground />
      <HeroContent />
      <BottomBar />
    </Box>
  );
};

export default HeroSection;
