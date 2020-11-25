import React, { useState } from 'react';
import {PopUp} from './PopUp';
import axios from 'axios';
import EntryCard from './EntryCard';

const EntryList = () => {
    
    const [response, setResponse] = useState("");
    const [entryList, setEntryList] = useState([]);
    const [downloadedData, setDownloadedData] = useState(false);

    const [category, setCategory] = useState("0");
    const [status, setStatus] = useState("0");
    const [timeframe, setTimeframe] = useState("-1");
    const [notesText, setNotesText] = useState(" ");
    const [listOfCategories, setListOfCategories] = useState([]);
    const [listOfStatuses, setListOfStatuses] = useState([]);
    const [showArchived, setShowArchived] = useState(false);

    const handleSubmit = (event) => {
        if (event !== undefined) event.preventDefault();

        axios(
            {
                method: 'get',
                url: 'API/GetEntries',
                params: {
                    userID: sessionStorage.getItem('user'),
                    category: category,
                    status: status,
                    timeframe: timeframe,
                    notesText: notesText,
                    showArchived: showArchived
                }
            }
        ).then((res) => {
            
            if(!res.data.includes("Error")){
                setEntryList(res.data);
                setResponse("Success!");                
            }
            else setResponse(res.data);
        }
        ).catch((err) => {
            setResponse(err.response.statusText);
        });
    }

    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === "") {
        return (
            <p className="alert alert-danger">You do not have access to this page.</p>
        );
    }
    else{

        // Runs when loaded once to load Categories and Statuses
        if (!downloadedData){
            if(sessionStorage.getItem('isDiabetic') === "true")
            {
                axios(
                    {
                        method: 'get',
                        url: 'API/GetCategories'
                    }
                ).then((res) => {     
                    setListOfCategories(res.data);
                });
            }
            else {
                axios(
                    {
                        method: 'get',
                        url: 'API/GetCategoriesNoDia'
                    }
                ).then((res) => {     
                    setListOfCategories(res.data);
                });
            }

            axios(
                {
                    method: 'get',
                    url: 'API/GetStatuses'
                }
            ).then((res) => {     
                setListOfStatuses(res.data);
            });

            // Initial load of data with no filters
            handleSubmit();

            setDownloadedData(true);
        }




        
        return (
            <div id="entry-list">
                <h2>My Notebook</h2>
                
                {(response !== "" && response !== "Success!") ? <PopUp message={response} /> : ""}
                <form onSubmit={event => handleSubmit(event)}>
                    <h4>Filter options</h4>
                    <label htmlFor='timeframe'>Time Frame: </label>
                    <select id='timeframe' name='timeframe'onChange={(e) => setTimeframe(e.target.value)} value={timeframe} required>
                        <option value="-1">To date</option>
                        <option value="0">Today</option>
                        <option value="7">Past week</option>
                        <option value="14">Past 2 weeks</option>
                        <option value="30">Past 30 days</option>
                        <option value="90">Past 90 days</option>
                        <option value="180">Past 180 days</option>
                    </select>

                    <label htmlFor='category'>Category: </label>
                    <select name='category' defaultValue='0' id='category' onChange={(e) => setCategory(e.target.value)}>
                        <option value="0">All</option>
                        {
                            listOfCategories.map( (categoryItem) => <option key={categoryItem.id} value={categoryItem.id}>{categoryItem.name}</option>)
                        }
                    </select>

                    <label htmlFor='status'>Mood: </label>
                    <select name='status' defaultValue='0' id='status' onChange={(e) => setStatus(e.target.value)}>
                        <option value="0">All</option>
                        {
                            listOfStatuses.map( (statusItem) => <option key={statusItem.id} value={statusItem.id}>{statusItem.name}</option>)
                        }
                    </select>

                    <label htmlFor='notesText'>Text in notes: </label>
                    <input id='notesText' name='notesText' type='text' onChange={(e) => setNotesText(e.target.value)} value={notesText} />

                    <label htmlFor='showArchived'>Show Archived: </label>
                    <input id='showArchived' name='showArchvied' type='checkbox' onChange={(e) => setShowArchived(!showArchived)} value={showArchived} />

                    <input type="submit" value="Filter" />
                </form>
                <div id="entry-card-list">
                    
                        {
                            (entryList.length !== 0) ? entryList.map( (Item) => <EntryCard entry={Item} key={Item.id}/>) : <p>No matching entries found.</p>
                        }
                    
                </div>
            </div>

        );
        
    }
}

export default EntryList;
