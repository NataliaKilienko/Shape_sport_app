import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutList, Exercise } from '../types/types';

const loadFromLocalStorage = (): WorkoutList[] => {
  try {
    const savedLists = localStorage.getItem('workoutLists');
    return savedLists ? JSON.parse(savedLists) : [];
  } catch (error) {
    console.error('Error loading workout lists:', error);
    return [];
  }
};

const saveToLocalStorage = (state: WorkoutList[]) => {
  try {
    localStorage.setItem('workoutLists', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving workout lists:', error);
  }
};

const initialState: WorkoutList[] = loadFromLocalStorage();

const workoutListsSlice = createSlice({
  name: 'workoutLists',
  initialState,
  reducers: {
    createWorkoutList(state, action: PayloadAction<{ id: number; name: string }>) {
      state.push({ id: action.payload.id, name: action.payload.name, exercises: [] });
      saveToLocalStorage(state);
    },
    deleteWorkoutList(state, action: PayloadAction<number>) {
      const newState = state.filter((list) => list.id !== action.payload);
      saveToLocalStorage(newState);
      return newState;
    },
    addExerciseToList(state, action: PayloadAction<{ listId: number; exercise: Exercise }>) {
      const list = state.find((list) => list.id === action.payload.listId);
      if (list) {
        const isDuplicate = list.exercises.some((ex) => ex.id === action.payload.exercise.id);
        if (!isDuplicate) {
          list.exercises.push(action.payload.exercise);
          saveToLocalStorage(state);
        } else {
          console.warn('Attempted to add duplicate exercise:', action.payload.exercise);
        }
      }      
    },
    removeExerciseFromList(state, action: PayloadAction<{ listId: number; exerciseId: string }>) {
      const list = state.find((list) => list.id === action.payload.listId);
      if (list) {
        list.exercises = list.exercises.filter((exercise) => exercise.id !== action.payload.exerciseId);
        saveToLocalStorage(state);
      }
    },
  },
});

export const { createWorkoutList, deleteWorkoutList, addExerciseToList, removeExerciseFromList } = workoutListsSlice.actions;
export default workoutListsSlice.reducer;
