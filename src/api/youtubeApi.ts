import axios from 'axios';

const YOUTUBE_API_URL = 'https://youtube-v31.p.rapidapi.com';
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

const youtubeApiClient = axios.create({
  baseURL: YOUTUBE_API_URL,
  headers: {
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    'X-RapidAPI-Key': API_KEY,
  },
});

export const fetchYouTubeVideos = async (query: string) => {
    try {
        const response = await youtubeApiClient.get('/search', {
            params: {
                q: query,
                part: 'snippet',
                regionCode: 'US',
                maxResults: 3,
                order: 'date',
            },
        });

        if (!response.data.items || response.data.items.length === 0) {
            console.warn('No YouTube videos found.');
            return [];
        }

        return response.data.items.map((item: any) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnails: item.snippet.thumbnails,
        }));
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return []; 
    }
};
  