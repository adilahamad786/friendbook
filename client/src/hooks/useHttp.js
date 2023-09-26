import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const sendRequest = useCallback(async (reqConfig, applyData) => {
        setIsLoading(true);
        setError(false);

        try {
            const res = await fetch(reqConfig.url, {
                baseUrl : 'https://friendbook-b9pu.onrender.com',
                credentials: 'include',
                method : reqConfig.method ? reqConfig.method : "GET",
                headers : reqConfig.headers ? reqConfig.headers : {},
                body : reqConfig.body ? reqConfig.body : null,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(JSON.stringify(data.error));
            }

            applyData(data);
        }
        catch (error) {
            setError(JSON.parse(error.message));
        }

        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;