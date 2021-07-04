/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import DocumentFilter from '../components/DocumentFilter/DocumentFilter';
import DocumentList from '../components/DocumentList/DocumentList';
import Loading from '../components/Loading/Loading';
import useFetchItems from '../hooks/FetchItems';
import { Document } from '../interfaces';

const URL = 'http://localhost:8000/documents/';

function Documents() {
    const [url, setUrl] = useState<string>(URL);
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [finalOption, setFinalOption] = useState<number>(0);

    let container: any = useRef(null);
    const result = useFetchItems(url);

    useEffect(() => {
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        };
    });
    useEffect(() => {
        console.log('added');
        document.addEventListener('scroll', trackScrolling);
        // trackScrolling();
    }, [documents]);

    useEffect(() => {
        if (result.status === 'loaded' && result.payload !== undefined) {
            if (result.payload.length === 0) setHasEnded(true);
            setDocuments([...documents, ...result.payload]);
        }
    }, [result.status]);

    useEffect(() => {
        let tempUrl = URL;
        if (startDate !== '') tempUrl += '?num=' + finalOption + '&startDate=' + startDate;
        else tempUrl += '?num=' + finalOption;
        setDocuments([]);
        setHasEnded(false);
        setUrl(tempUrl);
    }, [startDate, finalOption]);

    const trackScrolling = () => {
        console.log('scrolled');
        if (container.current.getBoundingClientRect().bottom <= window.innerHeight) {
            let tempUrl = URL;
            if (documents.length !== 0)
                tempUrl +=
                    '?startDate=' + documents[documents.length - 1].date + '&num=' + finalOption;
            console.log(tempUrl);
            setUrl(tempUrl);
            console.log('removed');
            document.removeEventListener('scroll', trackScrolling);
        }
    };

    return (
        <div ref={container}>
            <DocumentFilter setFinalOption={setFinalOption} setStartDate={setStartDate} />
            <DocumentList documents={documents} />
            {!hasEnded && <Loading />}
            {hasEnded && <p style={{ textAlign: 'center' }}>You're all caught up!</p>}
            {result.status === 'error' && <div>{result.error?.message}</div>}
        </div>
    );
}

export default Documents;
