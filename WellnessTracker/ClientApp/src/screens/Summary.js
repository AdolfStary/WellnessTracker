import React, { useState, useEffect } from 'react';
import {getFilteredEntries, getNegativeStatusAllergens} from '../utility/api-calls';
import SicknessObservations from '../components/SicknessObservations';
import FilterOptionsSimple from '../components/FilterOptionsSimple';
import DiabetesToday from '../components/DiabtetesToday';
import MealToday from '../components/MealToday';
import '../css/summary.css';

const Summary = () => {
    
    const [entryList, setEntryList] = useState([]);
    const [sicknessData, setSicknessData] = useState({});

    const [timeframe, setTimeframe] = useState("-1");
    const [showArchived, setShowArchived] = useState(false);

    const getData = async () => {

        const filteredEntries = await getFilteredEntries(timeframe, showArchived);
        const sicknessData = await getNegativeStatusAllergens(timeframe, showArchived);

        setEntryList(filteredEntries.data);
        setSicknessData(sicknessData.data);
    }

    const handleSubmit = async (event) => {
        if (event !== undefined) event.preventDefault();
        getData();
    }

    useEffect(getData, []);
 
    return (
        <div id="summary">
            <h2>Summary</h2>
            
            <FilterOptionsSimple    setTimeframe={setTimeframe} setShowArchived={setShowArchived} handleSubmit={handleSubmit} 
                                    showArchived={showArchived} timeframe={timeframe} />

            <div className="summary-details">
                <div>
                    <h2>Data Summary</h2>

                    <DiabetesToday entryList={entryList} />
                    <MealToday entryList={entryList} />

                </div>
                <div className="observations">
                    <h2>Observations</h2>
                    <SicknessObservations sicknessData={sicknessData} />
                </div>
            </div>
        </div>

    );
}
export default Summary;
