import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';
import { ExerciseCardProps } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addToFavorites, removeFromFavorites } from '../../store/favoritesSlice';
import { Link } from 'react-router-dom';

const ExerciseCard: React.FC<ExerciseCardProps> = ({ id, name, target, gifUrl }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some((exercise) => exercise.id === id)
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites({ id, name, target, gifUrl }));
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: '400px',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: 'rgba(46, 46, 46, 0.95)',
        color: '#fff',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
  <Link to={`/exercise/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <CardMedia
        component="img"
        image={gifUrl}
        alt={name}
        sx={{
          height: '200px',
          objectFit: 'cover',
          filter: 'brightness(0.85)',
          transition: 'filter 0.3s ease',
          '&:hover': {
            filter: 'brightness(1)',
          },
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '120px',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#ffcc00' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: '#ffcc80' }}>
          Target Muscle: {target}
        </Typography>
      </CardContent>
      </Link>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >

        <Button
          variant="outlined"
          onClick={handleToggleFavorite}
          sx={{
            paddingX: '10px',
            paddingY: '5px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: '16px',
            color: isFavorite ? '#d32f2f' : '#ff9800',
            borderColor: isFavorite ? '#d32f2f' : '#ff9800',
            backgroundColor: 'transparent',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: isFavorite ? '#d32f2f' : '#ff9800',
              color: '#fff',
              transform: 'scale(1.1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          {isFavorite ? 'Remove' : 'Add'}
        </Button>
      </Box>
    </Card>
  );
};

export default ExerciseCard;
