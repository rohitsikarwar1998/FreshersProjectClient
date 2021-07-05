import { useState } from 'react';
import styles from './DocumentFilter.module.css';

const options = [
    {
        label: 'All',
        value: 0
    },
    {
        label: 'http://investor.weyerhaeuser.com/events-and-presentations',
        value: 1
    },
    {
        label: 'https://investor.fb.com/investor-events/',
        value: 2
    },
    {
        label: 'https://informacioncorporativa.entel.cl/investors/presentations',
        value: 3
    },
    {
        label: 'http://ir.homedepot.com/events-and-presentations',
        value: 4
    }
];

interface Props {
    setStartDate: Function;
    setFinalOption: Function;
}

const DocumentFilter = (props: Props) => {
    const [date, setDate] = useState<string>('');
    const [option, setOption] = useState<number>(0);

    function handleOptionChange(e: any) {
        console.log(e.target.value);
        setOption(e.target.value);
    }

    function handleDateChange(e: any) {
        console.log(e.target.value);
        setDate(e.target.value);
    }

    function handleOnClick(e: any) {
        if (date !== '') {
            let temp: string[] = date.split('/');
            if (temp.length !== 3) {
                props.setStartDate('');
                setDate('');
            } else props.setStartDate(`${temp[2]}-${temp[1]}-${temp[0]}T00:00:00`);
        } else props.setStartDate('');
        props.setFinalOption(option);
    }

    return (
        <div className={styles.documentFilter}>
            <div className={styles.links}>
                <select value={option} onChange={handleOptionChange}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.date}>
                <input
                    type="text"
                    value={date}
                    placeholder="dd/mm/yyyy"
                    onChange={handleDateChange}
                />
            </div>
            <button className={styles.btn} onClick={handleOnClick}>
                Search
            </button>
        </div>
    );
};

export default DocumentFilter;
