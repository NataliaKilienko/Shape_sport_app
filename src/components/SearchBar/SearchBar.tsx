import React from 'react';
import { TextField } from '@mui/material';
import { SearchBarProps } from '../../types/types';

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Search exercises..."
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{
        marginBottom: '24px',
        backgroundColor: '#333',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        input: {
          color: '#ffcc00',
          padding: '15px',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ffcc00',
          },
          '&:hover fieldset': {
            borderColor: '#ff9800',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ffcc00',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#ffcc00',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#ffcc00',
        },
      }}
    />
  );
};

export default SearchBar;
