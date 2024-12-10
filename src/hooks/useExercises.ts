import { useState, useEffect, useRef } from 'react';
import { fetchExercises, searchExercises, fetchExercisesByCategory } from '../api/exerciseApi';
import { Exercise } from '../types/types';

const itemsPerPage = 12;

const useExercises = (category: string, searchTerm: string) => {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [displayedExercises, setDisplayedExercises] = useState<Exercise[]>([]);
  const [page, setPage] = useState<number>(0);
  const debouncedSearchTerm = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const offset = page * itemsPerPage;
        const data = category === 'all' ? await fetchExercises(itemsPerPage, offset) : await fetchExercisesByCategory(category, itemsPerPage, offset);
        setAllExercises((prev) => (page === 0 ? data : [...prev, ...data]));
        setDisplayedExercises((prev) => (page === 0 ? data : [...prev, ...data]));
      } catch (error) {
        console.error('Error loading exercises:', error);
      }
    };
    loadExercises();
  }, [page, category]);

  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm.current) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(async () => {
        debouncedSearchTerm.current = searchTerm;

        if (searchTerm.trim() !== '') {
          try {
            const filteredResults = await searchExercises(searchTerm);
            setDisplayedExercises(filteredResults);
          } catch (error) {
            console.error('Error searching exercises:', error);
          }
        } else {
          setDisplayedExercises(allExercises);
        }
      }, 500);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchTerm, allExercises]);

  const loadMoreExercises = () => setPage((prev) => prev + 1);

  return { displayedExercises, loadMoreExercises, setPage, setAllExercises };
};

export default useExercises;
