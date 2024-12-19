import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { WorkoutList } from '../../types/types';

interface WorkoutListSelectorProps {
  workoutLists: WorkoutList[];
  currentListId: number | null;
  setCurrentListId: (id: number) => void;
}

const WorkoutListSelector: React.FC<WorkoutListSelectorProps> = ({ workoutLists, currentListId, setCurrentListId }) => (
  <FormControl fullWidth sx={{ marginBottom: '20px' }}>
    <InputLabel
      sx={{
        color: '#ffcc80',
        '&.Mui-focused': { color: '#ff9800' },
      }}
    >
      Select a Workout List
    </InputLabel>
    <Select
      value={currentListId || ''}
      onChange={(e) => setCurrentListId(Number(e.target.value))}
      label="Select a Workout List"
      sx={{
        backgroundColor: '#2a2a3d',
        color: '#ffcc80',
        '.MuiOutlinedInput-notchedOutline': { borderColor: '#ffcc80' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ff9800' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff9800' },
        '& .MuiSelect-icon': { color: '#ffcc80' },
        '.MuiInputBase-input': { color: '#ffcc80' },
      }}
    >
      {workoutLists.map((list) => (
        <MenuItem key={list.id} value={list.id} sx={{ color: '#1e1e2f' }}>
          {list.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default WorkoutListSelector;
