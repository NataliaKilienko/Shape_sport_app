import axios from 'axios';
import { Exercise } from '../types/types';

const API_BASE_URL = 'https://exercisedb.p.rapidapi.com';
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': API_KEY,
  },
});

export const fetchExercises = async (limit: number = 12, offset: number = 0) => {
  try {
    const response = await apiClient.get('/exercises', {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

export const searchExercises = async (searchTerm: string, limit: number = 1400): Promise<Exercise[]> => {
  try {
    const exercises = await fetchExercises(limit, 0);
    return exercises.filter((exercise: Exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching exercises:', error);
    throw error;
  }
};

export const fetchExercisesByCategory = async (category: string, limit: number = 12, offset: number = 0): Promise<Exercise[]> => {
  try {
    const response = await apiClient.get(`/exercises/bodyPart/${category}`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises by category:', error);
    throw error;
  }
};
