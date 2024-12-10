import React from 'react';
import { Box } from '@mui/material';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { Exercise } from '../../types/types';

interface ExerciseGridProps {
  exercises: Exercise[];
}

const ExerciseGrid: React.FC<ExerciseGridProps> = ({ exercises }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {exercises.map(({ id, name, target, gifUrl }) => (
        <Box key={id} sx={{ flex: '1 1 calc(25% - 20px)', maxWidth: 'calc(25% - 20px)' }}>
          <ExerciseCard id={id} name={name} target={target} gifUrl={gifUrl} />
        </Box>
      ))}
    </Box>
  );
};

export default ExerciseGrid;
