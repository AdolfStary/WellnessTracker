import React, { useState } from 'react';
import {PopUp} from './PopUp';
import axios from 'axios';

const MakeEntry = () => {
    
    const [response, setResponse] = useState("");

    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [time, setTime] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        let encodedPassword = username + password;

        axios(
            {
                method: 'post',
                url: 'API/MakeEntry',
                params: {
                    categoryID: category,
                    userID: sessionStorage.getItem('user'),
                    statusID: status,
                    time: time,
                    

                    
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
                    </select>
                    <label htmlFor='status'>Mood: </label>
                    <select name='status' id='status'>
                        {/* map all status, make api for getting status */}
                    </select>
                    <label htmlFor='time'>Time: </label>
                    <input id='time' name='time' type='datetime' onChange={(e) => setTime(e.target.value)} value={time} required />
                    <label htmlFor='username'>Username: </label>
                    <input id='username' name='username' type='text' onChange={(e) => setUsername(e.target.value)} value={username} required />
                    <label htmlFor='password'>Password: </label>
                    <input id='password' name='password' type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                    <input type='submit' className="btn btn-primary" value='Make Entry' />
                </form>
            </div>
        );
    }

    

}

export default MakeEntry;
