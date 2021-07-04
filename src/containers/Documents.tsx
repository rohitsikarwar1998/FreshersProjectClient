/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import DocumentList from '../components/DocumentList/DocumentList';
import Loading from '../components/Loading/Loading';
import useFetchItems from '../hooks/FetchItems';
import { Document } from '../interfaces';

const URL = 'http://localhost:8000/documents/';

interface Props {
    startDate: string;
    finalOption: number;
    isChanged: boolean;
}

function Documents(props: Props) {
    const [url, setUrl] = useState<string>(URL);
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    const [documents, setDocuments] = useState<Document[]>([]);

    const result = useFetchItems(url);
    let container: any = useRef(null);

    const { startDate, finalOption, isChanged } = props;

    useEffect(() => {
        setDocuments([]);
    }, [isChanged]);

    useEffect(() => {
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        };
    });
    useEffect(() => {
        console.log('added');
        document.addEventListener('scroll', trackScrolling);
        trackScrolling();
    }, [documents]);

    useEffect(() => {
        if (result.status === 'loaded' && result.payload !== undefined) {
            if (result.payload.length === 0) setHasEnded(true);
            setDocuments([...documents, ...result.payload]);
        }
    }, [result.status]);

    const trackScrolling = () => {
        console.log('scrolled');
        if (container.current.getBoundingClientRect().bottom <= window.innerHeight) {
            let tempUrl = URL;
            if (documents.length !== 0)
                tempUrl +=
                    '?startDate=' + documents[documents.length - 1].date + '&num=' + finalOption;
            else if (startDate !== '') tempUrl += '?startDate=' + startDate + '&num=' + finalOption;
            else tempUrl += '?num=' + finalOption;
            console.log(tempUrl);
            setUrl(tempUrl);
            console.log('removed');
            document.removeEventListener('scroll', trackScrolling);
        }
    };

    return (
        <div ref={container}>
            <DocumentList documents={documents} />
            {!hasEnded && <Loading />}
            {hasEnded && <p style={{ textAlign: 'center' }}>You're all caught up!</p>}
            {result.status === 'error' && <div>{result.error?.message}</div>}
        </div>
    );
}

export default Documents;
