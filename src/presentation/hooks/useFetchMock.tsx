import { useState, useEffect } from 'react';

export function useFetchMock<T>(dataFile: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      import(`../data/${dataFile}`)
        .then((module) => {
          setData(module.default);
          setLoading(false);
        })
        .catch((e) => {
          console.error('Error loading mock data:', e);
          setError(e);
          setLoading(false);
        });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [dataFile]);

  return { data, loading, error };
}