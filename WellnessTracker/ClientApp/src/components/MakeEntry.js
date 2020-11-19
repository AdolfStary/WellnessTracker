import React, { useState } from 'react';
import {PopUp} from './PopUp';
import axios from 'axios';

const MakeEntry = () => {
    
    const [response, setResponse] = useState("");

    const [category, setCategory] = useState("1");
    const [status, setStatus] = useState("1");
    const [time, setTime] = useState("");
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fats, setFats] = useState(0);
    const [notes, setNotes] = useState("");
    const [insulin, setInsulin] = useState(0);
    const [bg, setBG] = useState(0);


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
    else {
        return (
            <div id="entryform">
                <h2>Make an entry</h2>
                {response !== "" ? <PopUp message={response} /> : ""}
                <form onSubmit={event => handleSubmit(event)}>

                    <label htmlFor='category'>Category: </label>
                    <select name='category' id='category'>
                        {/* map all categories, make api for getting categories */}
                        <option value="1">1</option>
                    </select>

                    <label htmlFor='status'>Mood: </label>
                    <select name='status' id='status'>
                        {/* map all status, make api for getting status */}
                        <option value="1">1</option>
                    </select>

                    <label htmlFor='time'>Time: </label>
                    <input id='time' name='time' type='datetime-local' onChange={(e) => setTime(e.target.value)} value={time} required />

                    <label htmlFor='carbs'>Carbs: </label>
                    <input id='carbs' name='carbs' type='number' onChange={(e) => setCarbs(e.target.value)} value={carbs} />

                    <label htmlFor='protein'>Protein: </label>
                    <input id='protein' name='protein' type='number' onChange={(e) => setProtein(e.target.value)} value={protein} />
   
                    <label htmlFor='fats'>Fats: </label>
                    <input id='fats' name='fats' type='number' onChange={(e) => setFats(e.target.value)} value={fats} />
                    
                    <label htmlFor='insulin'>Insulin: </label>
                    <input id='insulin' name='insulin' type='number' onChange={(e) => setInsulin(e.target.value)} value={insulin} />
                    
                    <label htmlFor='bg'>Blood Glucose: </label>
                    <input id='bg' name='bg' type='number' onChange={(e) => setBG(e.target.value)} value={bg} />

                    <label htmlFor='notes'>Notes: </label>
                    <textarea id='notes' name='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />


                    <input type='submit' className="btn btn-primary" value='Make Entry' />
                </form>
            </div>
        );
    }

    

}

export default MakeEntry;