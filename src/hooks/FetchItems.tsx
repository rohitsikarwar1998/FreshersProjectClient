import { useEffect, useState } from 'react';
import { Document } from '../interfaces';

export interface Service<Type> {
    payload?: Type[];
    status: 'loading' | 'loaded' | 'error';
    error?: Error;
}

const useFetchItems = (url: string) => {
    const [result, setResult] = useState<Service<Document>>({ status: 'loading' });

    useEffect(() => {
        if (url) {
            setResult({ status: 'loading' });
            setTimeout(() => {
                fetch(url)
                    .then((response) => response.json())
                    .then((res) => {
                        console.log(res);
                        setResult({ status: 'loaded', payload: res.data[0] });
                    })
                    .catch((err) => setResult({ status: 'error', error: new Error(err.message) }));
            }, 5000);
        }
    }, [url]);

    return result;
};

export default useFetchItems;

//doubt on reusability of this hook
