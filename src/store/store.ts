import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import workoutListsReducer from './workoutListsSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    workoutLists: workoutListsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
