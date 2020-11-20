import React, { useState } from 'react';
import {PopUp} from './PopUp';
import axios from 'axios';
import EntryCard from './EntryCard';

const EntryList = () => {
    
    const [response, setResponse] = useState("");
    const [entryList, setEntryList] = useState([]);
    const [downloadedData, setDownloadedData] = useState(false);

    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [timeframe, setTimeframe] = useState("");
    const [notesText, setNotesText] = useState("");
    const [listOfCategories, setListOfCategories] = useState([]);
    const [listOfStatuses, setListOfStatuses] = useState([]);

    // Runs when loaded once to load Categories and Statuses
    if (!downloadedData){
        if(sessionStorage.getItem('isDiabetic') == "true")
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

        setDownloadedData(true);
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        axios(
            {
                method: 'get',
                url: 'API/GetEntries',
                params: {
                    userID: sessionStorage.getItem('user'),
                    category: category,
                    status: status,
                    timeframe: timeframe,
                    notesText: notesText
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
            setResponse(err.response.data);
        });
    }

    
    return (
        <div id="entry-list">
            <h2>My Notebook</h2>
            <h4>Filter options</h4>
            {response !== "" ? <PopUp message={response} /> : ""}
            <form onSubmit={event => handleSubmit(event)}>

                <label htmlFor='timeframe'>Time Frame: </label>
                <select id='timeframe' name='timeframe'onChange={(e) => setTimeframe(e.target.value)} value={timeframe} required>
                    <option value="0">To date</option>
                    <option value="7">Past week</option>
                    <option value="14">Past 2 weeks</option>
                    <option value="30">Past 30 days</option>
                    <option value="90">Past 90 days</option>
                    <option value="180">Past 180 days</option>
                </select>

                <label htmlFor='category'>Category: </label>
                <select name='category' id='category' onChange={(e) => setCategory(e.target.value)}>
                    <option value="0" selected>None</option>
                    {
                        listOfCategories.map( (categoryItem) => <option key={categoryItem.id} value={categoryItem.id}>{categoryItem.name}</option>)
                    }
                </select>

                <label htmlFor='status'>Mood: </label>
                <select name='status' id='status' onChange={(e) => setStatus(e.target.value)}>
                    <option value="0" selected>None</option>
                    {
                        listOfStatuses.map( (statusItem) => <option key={statusItem.id} value={statusItem.id}>{statusItem.name}</option>)
                    }
                </select>

                <label htmlFor='notesText'>Text in notes:</label>
                <input id='notesText' name='notesText' type='text' onChange={(e) => setNotesText(e.target.value)} value={notesText} />

                <input type="submit" value="Filter" />
            </form>
            <div>
                <ul>
                    {
                        entryList.map( (Item) => <li key={Item.id} value={Item.id}><EntryCard entry={Item} /></li>)
                    }
                </ul>
            </div>
        </div>

    );
    

}

export default EntryList;
