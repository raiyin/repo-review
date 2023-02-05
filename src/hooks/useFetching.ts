import { useState } from 'react';

export const useFetching = (callback: Function): [Function, string] => {
    const [error, setError] = useState('');

    const fetching = async (...args: unknown[]) => {
        try {
            await callback(...args);
        }
        catch (e: any) {
            setError(e.message);
        }
        finally {
        }
    };

    return [fetching, error];
};
