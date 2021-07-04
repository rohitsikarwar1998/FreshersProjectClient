/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import DocumentFilter from '../components/DocumentFilter/DocumentFilter';
import Documents from './Documents';

function Home() {
    const [startDate, setStartDate] = useState<string>('');
    const [finalOption, setFinalOption] = useState<number>(0);
    const [isChanged, setIsChanged] = useState<boolean>(true);

    useEffect(() => {
        setIsChanged(!isChanged);
    }, [startDate, finalOption]);

    return (
        <div>
            <DocumentFilter setFinalOption={setFinalOption} setStartDate={setStartDate} />
            <Documents startDate={startDate} finalOption={finalOption} isChanged={isChanged} />
        </div>
    );
}

export default Home;
