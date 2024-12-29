import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar';
import ExerciseGrid from '../../components/ExerciseGrid/ExerciseGrid';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import useExercises from '../../hooks/useExercises';

const categories = ['all', 'back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'];

const ExerciseList: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { displayedExercises, loadMoreExercises, setPage, hasMore } = useExercises(category, searchTerm);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setPage(0);
  };

  return (
    <Container id="exercise-list" sx={{ paddingY: '40px', minHeight: '100vh', color: '#fff' }}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FormControl fullWidth sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <InputLabel
          sx={{
            color: '#ffcc00',
            '&.Mui-focused': { color: '#ffcc00' },
          }}
        >
          Category
        </InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={handleCategoryChange}
          sx={{
            backgroundColor: '#333',
            color: '#ffcc00',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffcc00',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ff9800',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffcc00',
            },
            '& .MuiSelect-icon': {
              color: '#ffcc00',
            },
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category} sx={{ color: '#000' }}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ExerciseGrid exercises={displayedExercises} />
      {hasMore && <LoadMoreButton onClick={loadMoreExercises} />}
    </Container>
  );
};

export default ExerciseList;
