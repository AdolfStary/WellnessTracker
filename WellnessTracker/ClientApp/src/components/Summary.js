import React, { useState, useEffect } from 'react';
import {getFilteredEntries, getNegativeStatusAllergens} from '../utility/api-calls';
import SicknessObservations from './SicknessObservations';
import FilterOptionsSimple from './FilterOptionsSimple';
import DiabetesToday from './DiabtetesToday';
import MealToday from './MealToday';
import '../css/summary.css';

const Summary = () => {
    
    const [entryList, setEntryList] = useState([]);
    const [sicknessData, setSicknessData] = useState({});

    const [timeframe, setTimeframe] = useState("-1");
    const [showArchived, setShowArchived] = useState(false);

    useEffect(() =>{
        // Initial load of data with no filters
        handleSubmit();
    }, []);

    const handleSubmit = async (event) => {
        if (event !== undefined) event.preventDefault();

        const filteredEntries = await getFilteredEntries(timeframe, showArchived);
        const sicknessData = await getNegativeStatusAllergens(timeframe, showArchived);

        console.log(filteredEntries);
        console.log(sicknessData);
        setEntryList(filteredEntries.data);
        setSicknessData(sicknessData.data);
    }

    // Checks if user is logged in
    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === "") {
        return (
            <p className="alert alert-danger">You do not have access to this page.</p>
        );
    }
    else
    {    
        return (
            <div id="summary">
                <h2>Summary</h2>
                
                <FilterOptionsSimple setTimeframe={setTimeframe} setShowArchived={setShowArchived} handleSubmit={handleSubmit} showArchived={showArchived} timeframe={timeframe} />

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
}

export default Summary;
