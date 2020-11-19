import React, { useState } from 'react';
import {PopUp} from './PopUp';
import axios from 'axios';

const MakeEntry = () => {
    
    const [response, setResponse] = useState("");
    const [downloadedData, setDownloadedData] = useState(false);
    const [listOfCategories, setListOfCategories] = useState([]);
    const [listOfStatuses, setListOfStatuses] = useState([]);

    const [category, setCategory] = useState("-1");
    const [status, setStatus] = useState("-1");
    const [time, setTime] = useState("");
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fats, setFats] = useState(0);
    const [notes, setNotes] = useState("");
    const [insulin, setInsulin] = useState(0);
    const [bg, setBG] = useState(0);

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
                method: 'post',
                url: 'API/MakeEntry',
                params: {
                    categoryID: category,
                    userID: sessionStorage.getItem('user'),
                    statusID: status,
                    time: time,
                    carbs: carbs,
                    protein: protein,
                    fats: fats,
                    notes: notes,
                    insulin: insulin,
                    bg: bg   
                }
            }
        ).then((res) => {     
            setResponse(res.data);
        }
        ).catch((err) => {
            setResponse(err.response.data);
        });

        if (sessionStorage.getItem('user') !== null || sessionStorage.getItem('user') !== "") window.location = '/';
    }


    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === "") {
        return (
            <p className="alert alert-danger">You do not have access to this page.</p>
        );
    }
    else
    {
        return (
            <div id="entryform">
                <h2>Make an entry</h2>
                {response !== "" ? <PopUp message={response} /> : ""}
                <form onSubmit={event => handleSubmit(event)}>

                    <label htmlFor='category'>Category: </label>
                    <select name='category' id='category' onChange={(e) => setCategory(e.target.value)}>
                        {
                            listOfCategories.map( (categoryItem) => <option key={categoryItem.id} value={categoryItem.id}>{categoryItem.name}</option>)
                        }
                    </select>

                    <label htmlFor='status'>Mood: </label>
                    <select name='status' id='status' onChange={(e) => setStatus(e.target.value)}>
                        {
                            listOfStatuses.map( (statusItem) => <option key={statusItem.id} value={statusItem.id}>{statusItem.name}</option>)
                        }
                    </select>

                    <label htmlFor='time'>Time: </label>
                    <input id='time' name='time' type='datetime-local' onChange={(e) => setTime(e.target.value)} value={time} required />

                    <label htmlFor='carbs'>Carbs: </label>
                    <input id='carbs' name='carbs' type='number' onChange={(e) => setCarbs(e.target.value)} value={carbs} />

                    <label htmlFor='protein'>Protein: </label>
                    <input id='protein' name='protein' type='number' onChange={(e) => setProtein(e.target.value)} value={protein} />
   
                    <label htmlFor='fats'>Fats: </label>
                    <input id='fats' name='fats' type='number' onChange={(e) => setFats(e.target.value)} value={fats} />
                    
                    {
                        (sessionStorage.getItem('isDiabetic') == "true") ?
                            <div>
                                <label htmlFor='insulin'>Insulin: </label>
                                <input id='insulin' name='insulin' type='number' onChange={(e) => setInsulin(e.target.value)} value={insulin} />
                                
                                <label htmlFor='bg'>Blood Glucose: </label>
                                <input id='bg' name='bg' type='number' onChange={(e) => setBG(e.target.value)} value={bg} />
                            </div>
                            : false
                    }

                    <label htmlFor='notes'>Notes: </label>
                    <textarea id='notes' name='notes' onChange={(e) => setNotes(e.target.value)} value={notes} required />


                    <input type='submit' className="btn btn-primary" value='Make Entry' />
                </form>
            </div>
        );
    }
 

}

export default MakeEntry;
