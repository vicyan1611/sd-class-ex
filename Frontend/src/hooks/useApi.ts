import { useState, useCallback } from "react";

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <R>(apiFunction: () => Promise<R>): Promise<R> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction();
        setData(response as unknown as T);
        return response;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  return { data, loading, error, request };
}
