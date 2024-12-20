import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Layout from './components/Layout/Layout';
import ScrollToTop from './utils/scrollToTop';
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/workout-planner" element={<WorkoutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
