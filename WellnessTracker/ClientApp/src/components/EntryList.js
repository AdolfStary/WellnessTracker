import React, { useEffect, useState } from 'react';
import {PopUp} from './PopUp';
import EntryCard from './EntryCard';
import FilterOptions from './FilterOptions';
import {getCategories, getEntries, getStatuses} from '../utility/api-calls';
import '../css/entry-list.css';


const EntryList = () => {
    
    const [response, setResponse] = useState("");
    const [entryList, setEntryList] = useState([]);

    const [category, setCategory] = useState("0");
    const [status, setStatus] = useState("0");
    const [timeframe, setTimeframe] = useState("-1");
    const [notesText, setNotesText] = useState(" ");
    const [listOfCategories, setListOfCategories] = useState([]);
    const [listOfStatuses, setListOfStatuses] = useState([]);
    const [showArchived, setShowArchived] = useState(false);

    const handleSubmit = (event) => {
        if (event !== undefined) event.preventDefault();

        getEntries(category, status, timeframe, notesText, showArchived, setEntryList, setResponse);
    }

    useEffect(() => {
        const getStaticData = async () => {
            const categories = sessionStorage.getItem('isDiabetic') === "true" ? await getCategories(true) : await getCategories();
            const statuses = await getStatuses();
            setListOfStatuses(statuses);
            setListOfCategories(categories);
        }
        getStaticData();
        // Initial load of data with no filters
        handleSubmit();
    }, []);

    // Checks if user is logged in
    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === "") {
        return (
            <p className="alert alert-danger">You do not have access to this page.</p>
        );
    }
    else{        
        return (
            <div id="entry-list">
                <h2>My Notebook</h2>
                
                {(response !== "" && response !== "Success!") ? <PopUp message={response} /> : ""}
                
                <h4>Filter options</h4>
                
                <FilterOptions handleSubmit={handleSubmit} setTimeframe={setTimeframe} setCategory={setCategory} setStatus={setStatus} setNotesText={setNotesText} setShowArchived={setShowArchived} timeframe={timeframe} showArchived={showArchived} notesText={notesText} listOfCategories={listOfCategories} listOfStatuses={listOfStatuses} />

                <div id="entry-card-list">                    
                    {
                        // If all data is loaded show cards for all matching entries
                        entryList.length !== 0 && listOfCategories.length !== 0 && listOfStatuses !== 0 ? entryList.map( (Item) => <EntryCard entry={Item} statuses={listOfStatuses} categories={listOfCategories} key={Item.id}/>) : <p>No matching entries found.</p>
                    }                    
                </div>
            </div>

        );
        
    }
}

export default EntryList;
