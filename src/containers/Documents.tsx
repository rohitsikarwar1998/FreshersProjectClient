import DocumentList from '../components/DocumentList/DocumentList';
import Loading from '../components/Loading/Loading';
import useFetchItems from '../hooks/FetchItems';
const URL = 'http://localhost:8000/';

function Documents() {
    const result = useFetchItems(URL);

    return (
        <div>
            {result.status === 'loading' && <Loading />}
            {result.status === 'loaded' && (
                <DocumentList documents={result.payload !== undefined ? result.payload : []} />
            )}
            {result.status === 'error' && <div>{result.error?.message}</div>}
        </div>
    );
}

export default Documents;
