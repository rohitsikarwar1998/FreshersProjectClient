import { Document } from '../../interfaces';
import styles from './DocumentItem.module.css';

interface Props extends Document {
    key: string;
}
const DocumentItem = (props: Props) => {
    const { title, date, link } = props;

    return (
        <div className={styles.documentItem}>
            <div className={styles.documentDate}>
                {/* <span className="material-icons-outlined"></span> */}
                <i className="fa fa-calendar-minus"></i>
                <span>{stringToDate(date)}</span>
            </div>
            <div className={styles.documentTitle}>{title}</div>
            <div className={styles.documentLink}>
                <a href={link} target="blank">
                    read more...
                </a>
            </div>
        </div>
    );
};

function stringToDate(date: string): string {
    date += 'Z';
    let d: Date = new Date(date);
    return String(d).slice(0, 15);
}

export default DocumentItem;
