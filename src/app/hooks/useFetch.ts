import { useEffect, useState } from 'react';

export function useFetch<T>(endpoint: string, startLoading: boolean) {
    const [isLoading, setIsLoading] = useState<boolean>(startLoading);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        if (endpoint) {
            fetch(endpoint)
                .then((response) => response.json())
                .then((response) => {
                    setData(response);
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [endpoint]);

    return {
        isLoading,
        error,
        data,
    };
}
