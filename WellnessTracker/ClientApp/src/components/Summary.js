import React, { useState } from 'react';
import {PopUp} from './PopUp';
import axios from 'axios';

const Summary = () => {
    
    const [response, setResponse] = useState("");
    const [entryList, setEntryList] = useState([]);
    const [downloadedData, setDownloadedData] = useState(false);
    const [sicknessData, setSicknessData] = useState({});

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
                setEntryList(res.data);
                setResponse("Success!");                
        }
        ).catch((err) => {
            setResponse(err.response.data);
        });

        axios(
            {
                method: 'get',
                url: 'API/GetNegativeStatusAllergens',
                params: {
                    userID: sessionStorage.getItem('user'),
                    timeframe: timeframe,
                    showArchived: showArchived
                }
            }
        ).then((res) => {
            setSicknessData(res.data);
        }
        ).catch((err) => {
            setResponse(err.response.data);
        });
    }

    // Checks if user is logged in
    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === "") {
        return (
            <p className="alert alert-danger">You do not have access to this page.</p>
        );
    }
    else
    {
        // Runs when loaded once to load Categories, Statuses, Allergens related to negative feelings, if any
        if (!downloadedData){
            // Initial load of data with no filters
            handleSubmit();
            setDownloadedData(true);
        }

        // All calculations only execute if user is logged in
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
        
        // Calculates Average daily insulin
        const avgDailyInsulin = () => {
            let dailyTotal = 0;
            let lastDate = "";
            let dailyTotals = [];
            let superTotal = 0;

            for(let item of entryList){
                
                if(item.insulin !== 0){

                    if(lastDate === null) lastDate = new Date(item.time).getDate();

                    if (new Date(item.time).getDate() === lastDate){
                        dailyTotal += item.insulin;                   
                    }
                    else {
                        dailyTotals.push(dailyTotal);                  
                        lastDate = new Date(item.time).getDate();
                        dailyTotal = 0;
                        dailyTotal += item.insulin;
                    }
                } 
            }

            if (dailyTotal !== 0){
                dailyTotals.push(dailyTotal);
            }

            for(let total of dailyTotals){
                superTotal += total;
            }

            return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(2)+"u" : "N/A";
        }
        
        const avgDailyFats = () => {
            let dailyTotal = 0;
            let lastDate = "";
            let dailyTotals = [];
            let superTotal = 0;    
            
            for(let item of entryList){
                
                if(lastDate === null) lastDate = new Date(item.time).getDate();

                if (new Date(item.time).getDate() === lastDate){
                    dailyTotal += item.fats;                   
                }
                else {
                    dailyTotals.push(dailyTotal);                  
                    lastDate = new Date(item.time).getDate();
                    dailyTotal = 0;
                    dailyTotal += item.fats;
                }
                if (entryList.indexOf(item) === entryList.length-1)
                    dailyTotals.push(dailyTotal);                
            }

            for(let total of dailyTotals){
                superTotal += total;
            }

            return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(0)+"g" : "N/A";
        }
    
        const avgDailyCarbs = () => {
            let dailyTotal = 0;
            let lastDate = "";
            let dailyTotals = [];
            let superTotal = 0;    
            
            for(let item of entryList){
                
                if(lastDate === null) lastDate = new Date(item.time).getDate();

                if (new Date(item.time).getDate() === lastDate){
                    dailyTotal += item.carbs;                   
                }
                else {
                    dailyTotals.push(dailyTotal);                  
                    lastDate = new Date(item.time).getDate();
                    dailyTotal = 0;
                    dailyTotal += item.carbs;
                }
                if (entryList.indexOf(item) === entryList.length-1)
                    dailyTotals.push(dailyTotal);                
            }

            for(let total of dailyTotals){
                superTotal += total;
            }

            return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(0)+"g" : "N/A";
        }
    
        const avgDailyProtein = () => {
            let dailyTotal = 0;
            let lastDate = "";
            let dailyTotals = [];
            let superTotal = 0;    
            
            for(let item of entryList){
                
                if(lastDate === null) lastDate = new Date(item.time).getDate();

                if (new Date(item.time).getDate() === lastDate){
                    dailyTotal += item.protein;                   
                }
                else {
                    dailyTotals.push(dailyTotal);                  
                    lastDate = new Date(item.time).getDate();
                    dailyTotal = 0;
                    dailyTotal += item.protein;
                }
                if (entryList.indexOf(item) === entryList.length-1)
                    dailyTotals.push(dailyTotal);             
            }

            for(let total of dailyTotals){
                superTotal += total;
            }

            return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(0)+"g" : "N/A";
        }

        // Calculates average daily meals per day, includes days where user skipped meals to give accurate data
        const avgDailyMeals = () => {
            let dailyTotal = 0;
            let lastDate = "";
            let dailyTotals = [];
            let superTotal = 0;
    
            
            for(let item of entryList){
                
                if(lastDate === null) lastDate = new Date(item.time).getDate();

                if (new Date(item.time).getDate() === lastDate){
                    if (item.categoryID === -5)
                        dailyTotal++;                   
                }
                else {
                    dailyTotals.push(dailyTotal);                  
                    lastDate = new Date(item.time).getDate();
                    dailyTotal = 0;
                    if (item.categoryID === -5)
                        dailyTotal++; 
                }
                if (entryList.indexOf(item) === entryList.length-1)
                    dailyTotals.push(dailyTotal);             
            }

            for(let total of dailyTotals){
                superTotal += total;
            }
            return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(1) : "N/A";
        }

        // Calculates average daily workout time, in case of multiple workouts through day, excludes days that are not workout days. Working out daily is not beneficial so lower average due to resting days is counter productive
        const avgDailyExercise = () => {
            let dailyTotal = 0;
            let lastDate = "";
            let dailyTotals = [];
            let superTotal = 0;

            for(let item of entryList){
                
                if(item.exerciseLength !== 0){

                    if(lastDate === null) lastDate = new Date(item.time).getDate();

                    if (new Date(item.time).getDate() === lastDate){
                        dailyTotal += item.exerciseLength;                   
                    }
                    else {
                        dailyTotals.push(dailyTotal);                  
                        lastDate = new Date(item.time).getDate();
                        dailyTotal = 0;
                        dailyTotal += item.exerciseLength;
                    }
                } 
            }

            if (dailyTotal !== 0){
                dailyTotals.push(dailyTotal);
            }

            for(let total of dailyTotals){
                superTotal += total;
            }

            return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(0)+"m" : "N/A";
        }

        // Method to display possible relation between allergens consumed within 3 hrs prior to negative feeling entries
        const displaySickData = () => {
            let totalCases;
            const arrayResponse = Object.entries(sicknessData);
            for(let item of arrayResponse){
                if (item[0] === "AllergenMeal"){
                    totalCases = item[1];
                    delete arrayResponse[arrayResponse.indexOf(item)];
                }

            }
            arrayResponse.sort((a,b) => b[1] - a[1]);

            return(
                        arrayResponse.map( (item) => <li key={item[0]} className={(item[1]/totalCases*100).toFixed(0) > 50 ? "high" : "mid"}><strong>{item[0]}</strong> in <strong>{(item[1]/totalCases*100).toFixed(0)}%</strong> of cases</li>)
            );
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
                                            <td className="today-diabetes-totinsulin">{avgDailyInsulin()}</td>
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
                                        <th className="today-meal-fats">Avg Daily Fats</th>
                                        <th className="today-meal-carbs">Avg Daily Carbs</th>
                                        <th className="today-meal-protein">Avg Daily Protein</th>
                                        <th className="today-meal-meals">Avg Daily Meals</th>
                                        <th className="today-meal-exercise">Avg 'Exercise Day' length</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="today-meal-fats">{avgDailyFats()}</td>
                                        <td className="today-meal-carbs">{avgDailyCarbs()}</td>
                                        <td className="today-meal-protein">{avgDailyProtein()}</td>
                                        <td className="today-meal-meals">{avgDailyMeals()}</td>
                                        <td className="today-meal-exercise">{avgDailyExercise()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="observations">
                        <h2>Observations</h2>
                        <div className="sick-data">
                            <ul>
                                <li className="neutral">Did you know, you were not feeling well within 3 hours after eating these foods?</li>
                                {sicknessData !== null ? displaySickData() : "No data that could give insight was detected."}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        );
        
    }
}

export default Summary;
