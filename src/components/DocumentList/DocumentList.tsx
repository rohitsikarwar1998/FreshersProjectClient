import { Document } from '../../interfaces';
import DocumentItem from '../DocumentItem/DocumentItem';
import styles from './DocumentList.module.css';

const DocumentList = ({ documents }: { documents: Document[] }) => {
    return (
        <div className={styles.documentList}>
            {documents.map((document) => (
                <DocumentItem key={document.id} {...document} />
            ))}
        </div>
    );
};

export default DocumentList;
