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
                padding: '30px',
                maxWidth: '700px',
                margin: '0 auto',
                backgroundColor: '#1e1e2f',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                color: '#fff',
            }}
        >
            <Typography
                variant="h4"
                sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#ff9800' }}
            >
                Workout Planner
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsDialogOpen(true)}
                sx={{
                    backgroundColor: '#ff9800',
                    '&:hover': { backgroundColor: '#f57c00' },
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    color: '#1e1e2f',
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
                            '&:hover': { backgroundColor: '#b71c1c', color: '#fff' },
                        }}
                        fullWidth
                    >
                        Delete Current Workout List
                    </Button>

                    <Autocomplete
                        options={Array.from(new Map(exercises.map((ex) => [ex.id, ex])).values())}
                        getOptionLabel={(option) => option.name}
                        value={selectedExercise}
                        onChange={(_, newValue) => setSelectedExercise(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search and Select an Exercise"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    backgroundColor: '#2a2a3d',
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
                        sx={{ marginBottom: '20px' }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddExercise}
                        disabled={!selectedExercise}
                        sx={{
                            backgroundColor: '#ff9800',
                            '&:hover': { backgroundColor: '#f57c00' },
                            fontWeight: 'bold',
                            color: '#1e1e2f',
                        }}
                        fullWidth
                    >
                        Add to Workout
                    </Button>

                    <Typography
                        variant="h5"
                        sx={{ marginTop: '30px', marginBottom: '10px', color: '#ffcc80' }}
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

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Create New Workout List</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Workout List Name"
                        variant="outlined"
                        fullWidth
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        sx={{
                            backgroundColor: '#2a2a3d',
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
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} sx={{ color: '#d32f2f' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateNewList}
                        variant="contained"
                        sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#f57c00' } }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default WorkoutPlanner;
