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

export interface ExerciseGridProps {
  exercises: Exercise[];
}

export interface LoadMoreButtonProps {
  onClick: () => void;
}

export interface ExerciseListProps {
  exercises: Exercise[];
  onRemove: (exerciseId: string) => void;
}

export interface WorkoutListSelectorProps {
  workoutLists: WorkoutList[];
  currentListId: number | null;
  setCurrentListId: (id: number) => void;
}