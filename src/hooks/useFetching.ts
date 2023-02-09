import { useState } from 'react';

export const useFetching = (callback: Function): [Function] => {

    const fetching = async (...args: unknown[]) => {
        try {
            await callback(...args);
        }
        catch (e: any) {
            console.log(e.message);
        }
        finally {
        }
    };

    return [fetching];
};
