import React, { useEffect, useState } from 'react';
import {PopUp} from '../components/PopUp';
import EntryCard from '../components/EntryCard';
import FilterOptions from '../components/FilterOptions';
import {getCategories, getEntries, getStatuses} from '../utility/api-calls';
import {isDiabetic} from '../utility/operations';
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

    const handleSubmit = async (event) => {
        if (event) event.preventDefault();

        const filteredEntries = await getEntries(category, status, timeframe, notesText, showArchived, setResponse);
        setEntryList(filteredEntries);
    }

    useEffect(() => {
        const getStaticData = async () => {
            const categories = await getCategories(isDiabetic());
            const statuses = await getStatuses();
            setListOfStatuses(statuses);
            setListOfCategories(categories);    
            
            const defaultEntries = await getEntries("0", "0", "-1", " ", false, setResponse);
            setEntryList(defaultEntries);
        }
        getStaticData();

    }, []);


      
    return (
        <div id="entry-list">
            <h2>My Notebook</h2>
            
            {(response !== "" && response !== "Success!") && <PopUp message={response} />}
            
            <h4>Filter options</h4>
            
            <FilterOptions  handleSubmit={handleSubmit} setTimeframe={setTimeframe} setCategory={setCategory}
                            setStatus={setStatus} setNotesText={setNotesText} setShowArchived={setShowArchived} 
                            timeframe={timeframe} showArchived={showArchived} notesText={notesText} 
                            listOfCategories={listOfCategories} listOfStatuses={listOfStatuses} />

            <div id="entry-card-list">                    
                {
                    // If all data is loaded show cards for all matching entries
                    entryList.length !== 0 && listOfCategories.length !== 0 && listOfStatuses.length !== 0 ? 
                        entryList.map( (Item) => <EntryCard entry={Item} statuses={listOfStatuses} categories={listOfCategories} key={Item.id}/>) 
                        : <p>No matching entries found.</p>
                }                    
            </div>
        </div>

    );        
}

export default EntryList;
