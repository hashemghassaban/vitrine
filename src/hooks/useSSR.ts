import { useState, useEffect, useCallback } from 'react';

export const useSSRData = <T,>(
  fetchFn: () => Promise<T>,
  deps: any[] = []
): [T | null, boolean, Error | null] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchFn();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [data, loading, error];
};

export const prefetchData = async <T,>(
  fetchFn: () => Promise<T>
): Promise<T> => {
  try {
    return await fetchFn();
  } catch (error) {
    console.error('Prefetch error:', error);
    throw error;
  }
};


