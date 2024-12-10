import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, FavoritesState } from '../types/types';

const loadFromLocalStorage = (): Exercise[] => {
  try {
    const serializedState = localStorage.getItem('favorites');
    return serializedState ? JSON.parse(serializedState) as Exercise[] : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const saveToLocalStorage = (state: Exercise[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('favorites', serializedState);
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

const initialState: FavoritesState = {
  items: loadFromLocalStorage(), 
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Exercise>) {
      if (!state.items.some((exercise) => exercise.id === action.payload.id)) {
        state.items = [...state.items, action.payload];
        saveToLocalStorage(state.items); 
      }
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.items = state.items.filter((exercise) => exercise.id !== action.payload);
      saveToLocalStorage(state.items); 
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
