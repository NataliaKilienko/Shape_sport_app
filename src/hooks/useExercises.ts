import { useState, useEffect, useRef } from 'react';
import { fetchExercises, searchExercises, fetchExercisesByCategory } from '../api/exerciseApi';
import { Exercise } from '../types/types';

const ITEMS_PER_PAGE = 12;

const useExercises = (category: string, searchTerm: string) => {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [displayedExercises, setDisplayedExercises] = useState<Exercise[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true); 
  const debouncedSearchTerm = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const offset = page * ITEMS_PER_PAGE;
        const data = category === 'all' ? await fetchExercises(ITEMS_PER_PAGE, offset) : await fetchExercisesByCategory(category, ITEMS_PER_PAGE, offset);
        
        if (data.length < ITEMS_PER_PAGE) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        setAllExercises((prev) => (page === 0 ? data : [...prev, ...data]));
        setDisplayedExercises((prev) => (page === 0 ? data : [...prev, ...data]));
      } catch (error) {
        console.error('Error loading exercises:', error);
      }
    };
    loadExercises();
  }, [page, category]);

  useEffect(() => {
    const performSearch = async () => {
      debouncedSearchTerm.current = searchTerm;
  
      if (!searchTerm.trim()) {
        setDisplayedExercises(allExercises);
        setHasMore(true);
        return;
      }
  
      try {
        const filteredResults = await searchExercises(searchTerm);
        setDisplayedExercises(filteredResults);
        setHasMore(false);
      } catch (error) {
        console.error('Error searching exercises:', error);
      }
    };
  
    if (searchTerm !== debouncedSearchTerm.current) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
  
      timeoutRef.current = setTimeout(performSearch, 500);
    }
  
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchTerm, allExercises]);  

  const loadMoreExercises = () => setPage((prev) => prev + 1);

  return { displayedExercises, loadMoreExercises, setPage, setAllExercises, hasMore };
};

export default useExercises;
