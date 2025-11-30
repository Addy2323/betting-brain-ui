import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

export const usePageLoading = (duration: number = 500) => {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    // Show loading overlay when component mounts
    setIsLoading(true);

    // Hide loading overlay after specified duration (reduced from 7000ms to 500ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [setIsLoading, duration]);
};
