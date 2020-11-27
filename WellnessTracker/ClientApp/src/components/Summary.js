import React, { useState } from 'react';
import {PopUp} from './PopUp';
import axios from 'axios';

const Summary = () => {
    
    const [response, setResponse] = useState("");
    const [entryList, setEntryList] = useState([]);
    const [downloadedData, setDownloadedData] = useState(false);

    const [timeframe, setTimeframe] = useState("-1");
    const [showArchived, setShowArchived] = useState(false);

    const handleSubmit = (event) => {
        if (event !== undefined) event.preventDefault();

        axios(
            {
                method: 'get',
                url: 'API/GetEntries',
                params: {
                    userID: sessionStorage.getItem('user'),
                    category: 0,
                    status: 0,
                    timeframe: timeframe,
                    notesText: "",
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
                       // Initial load of data with no filters
            handleSubmit();

            setDownloadedData(true);
        }

        const avgBG = () => {
            let total = 0, count = 0;
            let result;
    
            for(let item of entryList){
                if(item.bg !== 0){
                    total += item.bg;
                    count++;
                }
            }
    
            count > 0 ? result = (total / count).toFixed(2) : result = "N/A";
    
            return result;
        }
    
        const avgInsulin = () => {
            let total = 0, count = 0;
            let result;
    
            for(let item of entryList){
                if(item.insulin !== 0){
                    total += item.insulin;
                    count++;
                }
            }
    
            count > 0 ? result = (total / count).toFixed(2)+"u" : result = "N/A";
    
            return result;
        }   
        
        return (
            <div id="summary">
                <h2>Summary</h2>
                
                {(response !== "" && response !== "Success!") ? <PopUp message={response} /> : ""}
                <h4>Filter options</h4>
                <form onSubmit={event => handleSubmit(event)}>                    
                    <div>
                        <label htmlFor='timeframe'>Time: </label>
                        <select id='timeframe' name='timeframe'onChange={(e) => setTimeframe(e.target.value)} value={timeframe} required>
                            <option value="-1">To date</option>
                            <option value="0">Today</option>
                            <option value="7">Past week</option>
                            <option value="14">Past 2 weeks</option>
                            <option value="30">Past 30 days</option>
                            <option value="90">Past 90 days</option>
                            <option value="180">Past 180 days</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='showArchived'>Include Archived: </label>
                        <input id='showArchived' name='showArchvied' type='checkbox' onChange={(e) => setShowArchived(!showArchived)} value={showArchived} />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Filter" />
                </form>

                <div className="summary-details">
                
                    <div>
                        <h2>Data Summary</h2>
                        {   
                            (sessionStorage['isDiabetic'] === "true") ?
                            <div className="today-diabetes">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="today-diabetes-bg">Avg. BG</th>
                                            <th className="today-diabetes-avginsulin">Avg. insulin dose</th>
                                            <th className="today-diabetes-totinsulin">Avg. daily meal insulin</th>                                       
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="today-diabetes-bg">{avgBG()}</td>
                                            <td className="today-diabetes-avginsulin">{avgInsulin()}</td>
                                            <td className="today-diabetes-totinsulin">{/* avg amount of insulin daily*/}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            : false
                        }
                        <div className="today-meal">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="today-meal-fats">Avg Fats</th>
                                        <th className="today-meal-carbs">Avg Carbs</th>
                                        <th className="today-meal-protein">Avg Protein</th>
                                        <th className="today-meal-meals">Number of meals</th>
                                        <th className="today-meal-exercise">Exercise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="today-meal-fats">{/* avg amount of carbs daily */}</td>
                                        <td className="today-meal-carbs">{/* avg amount of carbs daily */}</td>
                                        <td className="today-meal-protein">{/* avg amount of protein daily */}</td>
                                        <td className="today-meal-meals">{/* avg amount of meals daily api */}</td>
                                        <td className="today-meal-exercise">{/* avg daily exercise api */}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="observations">
                        <h2>Observations</h2>

                    </div>

                </div>
            </div>

        );
        
    }
}

export default Summary;
