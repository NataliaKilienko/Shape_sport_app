import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { fetchExerciseById } from '../../api/exerciseApi';
import { fetchYouTubeVideos } from '../../api/youtubeApi';
import { Exercise, YouTubeVideo } from '../../types/types';

const ExerciseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadExerciseDetails = async () => {
            try {
                if (id) {
                    const exerciseData = await fetchExerciseById(id);
                    setExercise(exerciseData);
                    const videosData = await fetchYouTubeVideos(exerciseData.name);
                    setVideos(videosData);
                }
            } catch (error) {
                console.error('Error fetching exercise details or videos:', error);
            } finally {
                setLoading(false);
            }
        };

        loadExerciseDetails();
    }, [id]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#121212',
                    color: '#fff',
                }}
            >
                <CircularProgress sx={{ color: '#ffcc00' }} />
            </Box>
        );
    }

    if (!exercise) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#1e1e2f',
                }}
            >
                <Typography variant="h5" sx={{ color: '#fff' }}>
                    Exercise not found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#121212',
                color: '#fff',
                padding: '60px 20px',
                textAlign: 'center',
                animation: 'fadeIn 1.5s ease-in-out',
                '@keyframes fadeIn': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    marginBottom: '20px',
                    color: '#ffcc00',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8)',
                }}
            >
                {exercise.name}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '20px auto',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#262626',
                    width: '300px',
                    height: '300px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                }}
            >
                <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px',
                    }}
                />
            </Box>
            <Typography
                variant="h5"
                sx={{
                    color: '#ffcc00',
                    fontWeight: 'bold',
                    marginTop: '30px',
                    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
                }}
            >
                Target Muscle
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: '#d1d1d1',
                    fontSize: '18px',
                    marginBottom: '40px',
                }}
            >
                {exercise.target}
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    color: '#ffcc00',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8)',
                    marginBottom: '20px',
                }}
            >
                Related Videos
            </Typography>
            {videos.length > 0 ? (
                <Grid container spacing={4} justifyContent="center">
                    {videos.map((video, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                sx={{
                                    backgroundColor: '#262626',
                                    borderRadius: '12px',
                                    padding: '10px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { transform: 'scale(1.05)' },
                                }}
                            >
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <img
                                        src={video.thumbnails?.medium?.url || video.thumbnails?.default?.url}
                                        alt={video.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '12px',
                                            marginBottom: '10px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#fff',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {video.title}
                                    </Typography>
                                </a>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography
                    variant="body1"
                    sx={{
                        color: '#d1d1d1',
                        fontSize: '16px',
                        marginTop: '20px',
                    }}
                >
                    No related videos found for this exercise. Please try another search.
                </Typography>
            )}
        </Box>
    );
};

export default ExerciseDetail;
