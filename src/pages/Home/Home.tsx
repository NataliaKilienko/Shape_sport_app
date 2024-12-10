import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import ExerciseList from '../../components/ExerciseList/ExerciseList';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ExerciseList />
    </>
  );
};

export default Home;
