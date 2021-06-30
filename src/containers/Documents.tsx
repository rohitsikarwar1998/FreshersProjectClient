/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import DocumentList from '../components/DocumentList/DocumentList';
import Loading from '../components/Loading/Loading';
import useFetchItems from '../hooks/FetchItems';
import { Document } from '../interfaces';

const URL = 'http://localhost:8000/documents/';

function Documents() {
    const [url, setUrl] = useState<string>(URL);
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    const [documents, setDocuments] = useState<Document[]>([]);

    let container: any = useRef(null);
    const result = useFetchItems(url);

    useEffect(() => {
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        };
    });
    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);
    }, [documents]);

    useEffect(() => {
        if (result.status === 'loaded' && result.payload !== undefined) {
            if (result.payload.length === 0) setHasEnded(true);
            setDocuments([...documents, ...result.payload]);
        }
    }, [result.status]);

    const trackScrolling = () => {
        if (container.current.getBoundingClientRect().bottom <= window.innerHeight) {
            let tempUrl = URL;
            if (documents.length !== 0)
                tempUrl += '?startDate=' + documents[documents.length - 1].date;
            setUrl(tempUrl);
            document.removeEventListener('scroll', trackScrolling);
        }
    };

    return (
        <div ref={container}>
            <DocumentList documents={documents} />
            {result.status === 'loading' && <Loading />}
            {hasEnded && <p style={{ textAlign: 'center' }}>You're all cought up!</p>}
            {result.status === 'error' && <div>{result.error?.message}</div>}
        </div>
    );
}

export default Documents;
