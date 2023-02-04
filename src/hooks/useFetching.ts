import { useState } from 'react';

export const useFetching = (callback: Function): [Function, boolean, string] => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args: unknown[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
        }
        catch (e: any) {
            setError(e.message);
        }
        finally {
            setTimeout(async () => {
                setIsLoading(false);
            }, 1000);
        }
    };

    return [fetching, isLoading, error];
};
