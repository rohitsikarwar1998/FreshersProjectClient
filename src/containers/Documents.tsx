import DocumentList from '../components/DocumentList/DocumentList';
import useFetchItems from '../hooks/FetchItems';
const URL = 'http://localhost:8000/';

function Documents() {
    const result = useFetchItems(URL);

    return (
        <div>
            {result.status === 'loading' && <div>loading</div>}
            {result.status === 'loaded' && (
                <DocumentList documents={result.payload !== undefined ? result.payload : []} />
            )}
            {result.status === 'error' && <div>{result.error?.message}</div>}
        </div>
    );
}

export default Documents;
