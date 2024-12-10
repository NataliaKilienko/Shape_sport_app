import React from 'react';
import { Box, Button } from '@mui/material';

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{
          paddingX: '15px',
          paddingY: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderRadius: '20px',
          color: '#ff9800',
          borderColor: '#ff9800',
          backgroundColor: 'transparent',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#ff9800',
            color: '#fff',
            transform: 'scale(1.1)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        Load More
      </Button>
    </Box>
  );
};

export default LoadMoreButton;
