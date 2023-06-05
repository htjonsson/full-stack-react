// https://www.30secondsofcode.org/react/s/use-fetch/
// https://www.developerway.com/posts/how-to-fetch-data-in-react

import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    useEffect(() => {
        setLoading(true)
        setData(null);
        setError(null);

        fetch(url, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data)
            })
            .catch(error => {
                setError(error)   
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url])

    return { data, loading, error }
}

export default useFetch;