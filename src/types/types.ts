export interface Exercise {
    id: string;
    name: string;
    target: string;
    gifUrl: string;
  }
  
export  interface ExerciseCardProps {
    id: string;
    name: string;
    target: string;
    gifUrl: string;
  }
  
export interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
  }

export interface FavoritesState {
    items: Exercise[];
  }

export interface WorkoutList {
    id: number;
    name: string;
    exercises: Exercise[];
  }  

export interface YouTubeVideo {
    videoId: string;
    title: string;
    thumbnails: {
        medium?: { url: string };
        default?: { url: string };
    };
}