import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Exercise } from '../../types/types';

interface ExerciseListProps {
  exercises: Exercise[];
  onRemove: (exerciseId: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, onRemove }) => (
  <List sx={{ backgroundColor: '#2a2a3d', borderRadius: '8px' }}>
    {exercises.map((exercise, index) => (
  <ListItem
    key={`${exercise.id}-${index}`} 
    secondaryAction={
      <IconButton edge="end" onClick={() => onRemove(exercise.id)} sx={{ color: '#ff9800' }}>
        <DeleteIcon />
      </IconButton>
    }
  >
    <ListItemText primary={exercise.name} secondary={`Target: ${exercise.target}`} sx={{ color: '#fff' }} />
  </ListItem>
))}
  </List>
);

export default ExerciseList;
