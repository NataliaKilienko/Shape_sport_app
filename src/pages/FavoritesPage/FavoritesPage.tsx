import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
import { Box, Typography, Container } from '@mui/material';

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <Container
      sx={{
        paddingY: '40px',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '40px',
          fontWeight: 'bold',
          color: '#ffcc00',
        }}
      >
        Favorite Exercises
      </Typography>
      {favorites.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            marginTop: '40px',
            color: '#ffcc80',
          }}
        >
          No favorite exercises yet. Start adding some!
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {favorites.map(({ id, name, target, gifUrl }) => (
            <Box
              key={id}
              sx={{
                flex: '1 1 calc(20% - 20px)',
                maxWidth: 'calc(20% - 20px)',
                minWidth: '300px',
              }}
            >
              <ExerciseCard id={id} name={name} target={target} gifUrl={gifUrl} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default FavoritesPage;
