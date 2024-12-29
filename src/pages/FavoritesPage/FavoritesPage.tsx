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
        marginTop: '80px',
        minHeight: '100vh',
        animation: 'fadeIn 1s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        color: '#FFFFFF',
        padding: '20px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '40px',
          fontWeight: 'bold',
          color: '#ffcc00',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
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
            animation: 'fadeInEmpty 1s ease-in-out',
            '@keyframes fadeInEmpty': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
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
                minWidth: '250px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
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
