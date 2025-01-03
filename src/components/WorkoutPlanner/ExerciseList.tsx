import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExerciseListProps } from '../../types/types';

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, onRemove }) => (
  <Box
    sx={{
      backgroundColor: '#2a2a3d',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
    }}
  >
    {exercises.length === 0 ? (
      <Typography
        variant="h6"
        sx={{
          color: '#ffcc80',
          textShadow: '1px 1px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        No exercises added yet. 
      </Typography>
    ) : (
      <List>
        {exercises.map((exercise, index) => (
          <ListItem
            key={`${exercise.id}-${index}`}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => onRemove(exercise.id)}
                sx={{ color: '#ff9800' }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={exercise.name}
              secondary={`Target: ${exercise.target}`}
              sx={{ color: '#fff' }}
            />
          </ListItem>
        ))}
      </List>
    )}
  </Box>
);

export default ExerciseList;
