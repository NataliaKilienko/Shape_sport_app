import React, { useEffect, useState } from 'react';
import { fetchExercises } from '../../api/exerciseApi';
import { Exercise, WorkoutList } from '../../types/types';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Autocomplete,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';


const WorkoutPlanner: React.FC = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [workoutLists, setWorkoutLists] = useState<WorkoutList[]>([]);
    const [currentListId, setCurrentListId] = useState<number | null>(null);
    const [newListName, setNewListName] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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

    useEffect(() => {
        const savedLists = localStorage.getItem('workoutLists');
        if (savedLists) {
            setWorkoutLists(JSON.parse(savedLists));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('workoutLists', JSON.stringify(workoutLists));
    }, [workoutLists]);

    const handleAddExercise = () => {
        if (selectedExercise && currentListId !== null) {
            setWorkoutLists((prevLists) =>
                prevLists.map((list) =>
                    list.id === currentListId && !list.exercises.some((exercise) => exercise.id === selectedExercise.id)
                        ? { ...list, exercises: [...list.exercises, selectedExercise] }
                        : list
                )
            );
            setSelectedExercise(null);
        }
    };

    const handleRemoveExercise = (exerciseId: string) => {
        if (currentListId !== null) {
            setWorkoutLists((prevLists) =>
                prevLists.map((list) =>
                    list.id === currentListId
                        ? { ...list, exercises: list.exercises.filter((exercise) => exercise.id !== exerciseId) }
                        : list
                )
            );
        }
    };

    const handleCreateNewList = () => {
        if (newListName.trim()) {
            const newList: WorkoutList = {
                id: Date.now(),
                name: newListName,
                exercises: [],
            };
            setWorkoutLists((prevLists) => [...prevLists, newList]);
            setCurrentListId(newList.id);
            setNewListName('');
            setIsDialogOpen(false);
        }
    };

    const handleDeleteList = () => {
        setWorkoutLists((prevLists) => prevLists.filter((list) => list.id !== currentListId));
        setCurrentListId(null);
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
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#ff9800' }}>
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

            {workoutLists.length > 0 && (
                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                    <InputLabel
                        sx={{
                            color: '#ffcc80',
                            '&.Mui-focused': {
                                color: '#ff9800',
                            },
                        }}
                    >
                        Select a Workout List
                    </InputLabel>
                    <Select
                        value={currentListId || ''}
                        onChange={(e) => setCurrentListId(Number(e.target.value))}
                        label="Select a Workout List"
                        sx={{
                            backgroundColor: '#2a2a3d',
                            color: '#ffcc80',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ffcc80',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ff9800',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ff9800',
                            },
                            '& .MuiSelect-icon': {
                                color: '#ffcc80',
                            },
                            '.MuiInputBase-input': {
                                color: '#ffcc80',
                            },
                        }}
                    >
                        {workoutLists.map((list) => (
                            <MenuItem key={list.id} value={list.id} sx={{ color: '#1e1e2f' }}>
                                {list.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


            )}

            {currentListId !== null && (
                <>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<ClearIcon />}
                        onClick={handleDeleteList}
                        sx={{ marginBottom: '20px', borderColor: '#d32f2f', color: '#d32f2f', '&:hover': { backgroundColor: '#b71c1c', color: '#fff' } }}
                        fullWidth
                    >
                        Delete Current Workout List
                    </Button>

                    <Autocomplete
                        options={exercises}
                        getOptionLabel={(option) => option.name}
                        value={selectedExercise}
                        onChange={(event, newValue) => setSelectedExercise(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search and Select an Exercise"
                                sx={{
                                    backgroundColor: '#2a2a3d',
                                    borderRadius: '4px',
                                    input: { color: '#ffcc80' },
                                    label: {
                                        color: '#ffcc80',
                                        '&.Mui-focused': { color: '#ff9800' },
                                    },
                                    '.MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#ffcc80' },
                                        '&:hover fieldset': { borderColor: '#ff9800' },
                                        '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                                    },
                                }}
                            />
                        )}
                        sx={{
                            marginBottom: '20px',
                            '& .MuiAutocomplete-popupIndicator': { color: '#ff9800' },
                            '& .MuiAutocomplete-clearIndicator': { color: '#d32f2f' },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddExercise}
                        disabled={!selectedExercise}
                        fullWidth
                        sx={{
                            backgroundColor: '#ff9800',
                            color: '#1e1e2f',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#f57c00',
                            },
                            '&:disabled': {
                                backgroundColor: '#2a2a3d',
                                color: '#555',
                                cursor: 'not-allowed',
                            },
                        }}
                    >
                        Add to Workout
                    </Button>
                    <Typography variant="h5" sx={{ marginTop: '30px', marginBottom: '10px', color: '#ffcc80' }}>
                        Your Workout List
                    </Typography>

                    <List sx={{ backgroundColor: '#2a2a3d', borderRadius: '8px' }}>
                        {workoutLists.find((list) => list.id === currentListId)?.exercises.map((exercise) => (
                            <ListItem key={exercise.id} secondaryAction={
                                <IconButton edge="end" onClick={() => handleRemoveExercise(exercise.id)} sx={{ color: '#ff9800' }}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <ListItemText primary={exercise.name} secondary={`Target: ${exercise.target}`} sx={{ color: '#fff' }} />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#1e1e2f',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: '#2a2a3d',
                        color: '#ff9800',
                        fontWeight: 'bold',
                    }}
                >
                    Create New Workout List
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#2a2a3d' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Workout List Name"
                        fullWidth
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        sx={{
                            backgroundColor: '#1e1e2f',
                            borderRadius: '4px',
                            input: { color: '#ffcc80' },
                            label: {
                                color: '#ffcc80',
                                '&.Mui-focused': { color: '#ff9800' },
                            },
                            '.MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ffcc80' },
                                '&:hover fieldset': { borderColor: '#ff9800' },
                                '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#2a2a3d' }}>
                    <Button
                        onClick={() => setIsDialogOpen(false)}
                        sx={{
                            color: '#ffcc80',
                            '&:hover': { color: '#ff9800' },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateNewList}
                        variant="contained"
                        sx={{
                            backgroundColor: '#ff9800',
                            color: '#1e1e2f',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#f57c00' },
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
