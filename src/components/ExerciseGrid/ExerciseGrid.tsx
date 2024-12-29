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
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      {exercises.map(({ id, name, target, gifUrl }) => (
        <Box
          key={id}
          sx={{
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 20px)', md: '1 1 calc(25% - 20px)' },
            maxWidth: { xs: '100%', sm: 'calc(50% - 20px)', md: 'calc(25% - 20px)' },
          }}
        >
          <ExerciseCard id={id} name={name} target={target} gifUrl={gifUrl} />
        </Box>
      ))}
    </Box>
  );
};

export default ExerciseGrid;
