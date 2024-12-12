import React from 'react';
import WorkoutPlanner from '../../components/WorkoutPlanner/WorkoutPlanner';
import { Container } from '@mui/material';

const WorkoutPage: React.FC = () => {
  return (
    <Container sx={{ paddingY: '40px', minHeight: '100vh' }}>
      <WorkoutPlanner />
    </Container>
  );
};

export default WorkoutPage;
