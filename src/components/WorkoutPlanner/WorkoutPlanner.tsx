import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    createWorkoutList,
    deleteWorkoutList,
    addExerciseToList,
    removeExerciseFromList,
} from '../../store/workoutListsSlice';
import { fetchExercises } from '../../api/exerciseApi';
import { Exercise } from '../../types/types';
import {
    Box,
    Button,
    Typography,
    Autocomplete,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ExerciseList from './ExerciseList';
import WorkoutListSelector from './WorkoutListSelector';

const WorkoutPlanner: React.FC = () => {
    const dispatch = useDispatch();
    const workoutLists = useSelector((state: RootState) => state.workoutLists);

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [currentListId, setCurrentListId] = useState<number | null>(null);
    const [newListName, setNewListName] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const loadExercises = async () => {
            try {
                const data = await fetchExercises(1400);
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        loadExercises();
    }, []);

    const handleAddExercise = () => {
        if (selectedExercise && currentListId !== null) {
            dispatch(addExerciseToList({ listId: currentListId, exercise: selectedExercise }));
            setSelectedExercise(null);
        }
    };

    const handleCreateNewList = () => {
        if (newListName.trim()) {
            dispatch(createWorkoutList({ id: Date.now(), name: newListName }));
            setNewListName('');
            setIsDialogOpen(false);
        }
    };

    return (
        <Box
            sx={{
                padding: '40px',
                maxWidth: '800px',
                margin: '20px auto',
                backgroundColor: '#262626',
                borderRadius: '16px',
                boxShadow: '0 6px 30px rgba(0, 0, 0, 0.5)',
                color: '#fff',
                animation: 'fadeIn 1s ease-in-out',
                '@keyframes fadeIn': {
                    '0%': { opacity: 0, transform: 'scale(0.9)' },
                    '100%': { opacity: 1, transform: 'scale(1)' },
                },
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    color: '#ff9800',
                    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
                }}
            >
                Workout Planner
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsDialogOpen(true)}
                sx={{
                    backgroundColor: '#ff9800',
                    '&:hover': { backgroundColor: '#f57c00', transform: 'scale(1.05)' },
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    color: '#1e1e2f',
                    transition: 'all 0.3s ease',
                }}
                fullWidth
            >
                Create New Workout List
            </Button>

            <WorkoutListSelector
                workoutLists={workoutLists}
                currentListId={currentListId}
                setCurrentListId={setCurrentListId}
            />

            {currentListId !== null && (
                <>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<ClearIcon />}
                        onClick={() => dispatch(deleteWorkoutList(currentListId))}
                        sx={{
                            marginBottom: '20px',
                            borderColor: '#d32f2f',
                            color: '#d32f2f',
                            '&:hover': {
                                backgroundColor: '#b71c1c',
                                color: '#fff',
                                borderColor: '#b71c1c',
                            },
                            fontWeight: 'bold',
                        }}
                        fullWidth
                    >
                        Delete Current Workout List
                    </Button>

                    <Autocomplete
                        options={exercises}
                        getOptionLabel={(option: Exercise) => option.name}
                        value={selectedExercise}
                        onChange={(_, newValue: Exercise | null) => setSelectedExercise(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search and Select an Exercise"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    backgroundColor: '#262626',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#ffcc80' },
                                        '&:hover fieldset': { borderColor: '#ff9800' },
                                        '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffcc80',
                                        '&.Mui-focused': { color: '#ff9800' },
                                    },
                                    input: { color: '#ffcc80' },
                                }}
                            />
                        )}
                        isOptionEqualToValue={(option: Exercise, value: Exercise) => option.id === value.id}
                        renderOption={(props, option: Exercise) => (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        )}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddExercise}
                        disabled={!selectedExercise}
                        sx={{
                            backgroundColor: '#ff9800',
                            '&:hover': { backgroundColor: '#f57c00', transform: 'scale(1.05)' },
                            fontWeight: 'bold',
                            color: '#1e1e2f',
                            transition: 'all 0.3s ease',
                        }}
                        fullWidth
                    >
                        Add to Workout
                    </Button>

                    <Typography
                        variant="h5"
                        sx={{
                            marginTop: '30px',
                            marginBottom: '10px',
                            color: '#ffcc80',
                            textAlign: 'center',
                        }}
                    >
                        Your Workout List
                    </Typography>

                    <ExerciseList
                        exercises={
                            workoutLists.find((list) => list.id === currentListId)?.exercises || []
                        }
                        onRemove={(exerciseId) =>
                            dispatch(removeExerciseFromList({ listId: currentListId, exerciseId }))
                        }
                    />
                </>
            )}

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#262626',
                        borderRadius: '15px',
                        color: '#fff',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: '#262626',
                        color: '#ffcc80',
                        fontWeight: 'bold',
                    }}
                >
                    Create New Workout List
                </DialogTitle>
                <DialogContent
                    sx={{
                        backgroundColor: '#262626',
                        color: '#fff',
                    }}
                >
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Workout List Name"
                        variant="outlined"
                        fullWidth
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        sx={{
                            backgroundColor: '#262626',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ffcc80' },
                                '&:hover fieldset': { borderColor: '#ff9800' },
                                '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#ffcc80',
                                '&.Mui-focused': { color: '#ff9800' },
                            },
                            input: { color: '#ffcc80' },
                        }}
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        backgroundColor: '#262626',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button onClick={() => setIsDialogOpen(false)} sx={{ color: '#d32f2f' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateNewList}
                        variant="contained"
                        sx={{
                            backgroundColor: '#ff9800',
                            '&:hover': { backgroundColor: '#f57c00' },
                            fontWeight: 'bold',
                        }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default WorkoutPlanner;
