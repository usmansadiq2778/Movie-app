import React, { useState, useEffect } from 'react';
import { fetchDatafromApi } from '../utlis/api';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading('Loading ....');
        setData(null);
        setError(null);

        fetchDatafromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError('something went wrong');
            });
    }, [url]);

    return { data, error, loading };
};

export default useFetch;
