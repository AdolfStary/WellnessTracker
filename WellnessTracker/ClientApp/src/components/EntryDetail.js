import React, {useEffect, useState} from 'react';
import {PopUp} from './PopUp';
import {changeNotes, loadAllergens, changeArchiveEntry} from '../utility/api-calls';

const EntryDetail = () => {


    const [isArchived, setIsArchived] = useState(false);
    const [textareaDisabled, setTextareaDisabled] = useState(true);
    const [notes, setNotes] = useState("No notes were entered.");
    const [response, setResponse] = useState("");
    const [allergens, setAllergens] = useState([]);

    let time, date, entry, entryStatic;

    // Resets defaults if changes are discarded.
    const discardChange = () => {
        setTextareaDisabled(true);
        setNotes(entry.notes);
    }

    useEffect(() => {
        // Initial data load
        setNotes(entry.notes);
        setIsArchived(Boolean(entry.isArchived));   
        loadAllergens(entry, setAllergens, setResponse);
    },[]);


    // Checks if user is logged in
    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === "") {
        return (
            <p className="alert alert-danger">You do not have access to this page.</p>
        );
    }
    // Checks if entry data is present
    else if (sessionStorage.getItem('entry') === null || sessionStorage.getItem('entry') === undefined)
    {
        return (
            <p className="alert alert-danger">Entry details are not available.</p>
        );
    }
    else
    {
        // Gets entry data from sessionStorage
        entry = JSON.parse(sessionStorage.getItem('entry'));
        entryStatic = JSON.parse(sessionStorage.getItem('entryStatic'));

        date = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(entry.time));

        time = new Intl.DateTimeFormat("en-GB", {
            hour: "numeric",
            minute: "numeric"
            }).format(new Date(entry.time));

        return (
            <>
            <h2>Entry Details</h2>

            {response !== "" ? <PopUp message={response} /> : ""}

            <div className={`entry-details ${entryStatic.category}`}>

                { /* Shows whether entry is archived */
                    isArchived ? <p className="alert alert-danger right">Archived</p> : false 
                }

                <div className={`category ${entryStatic.category}`}> 
                    <h2>{entryStatic.category}</h2>
                    <div className="time-status">
                        <div className="time right">{date} - {time}</div>
                        <div className={`status ${entryStatic.status} right ${entryStatic.isPositive}`}>{entryStatic.status}</div>
                    </div>
                </div>  

                {
                    // If entry was a meal, show nutrition
                    (entryStatic.category === "Meal") ? 
                        <div className="meal">
                            <h4>Nutrition</h4>
                            <div className="nutrition-details">
                                <div className="today-meal-fats"><p>Fat<br />{entry.fats > 0 ? entry.fats+"g" : "N/A"}</p></div>
                                <div className="today-meal-carbs"><p>Carb<br />{entry.carbs > 0 ? entry.carbs+"g" : "N/A"}</p></div>
                                <div className="today-meal-protein"><p>Protein<br />{entry.protein > 0 ? entry.protein+"g" : "N/A"}</p></div>  
                                {
                                    allergens.length > 0 ? allergens.map( (item, index) => <div key={index} className="allergen-box"><p>{item}</p></div>) : false
                                }
                            </div>                     
                        </div> 
                        : false
                }
                { 
                    // If person is a diabetic and they measured blood glucose or took insulin - show diabetic data
                    (sessionStorage.getItem('isDiabetic') === "true" && (entry.bg !== 0 || entry.insulin !== 0)) ?
                    <div>
                        <h4>Diabetes</h4>
                        <div className="diabetes">                        
                            <div className="today-diabetes-bg"><p>BG<br />{entry.bg > 0 ? entry.bg : "N/A"}</p></div>
                            <div className="today-diabetes-avginsulin"><p>Insulin<br />{entry.insulin > 0 ? entry.insulin+"u" : "N/A"}</p></div>
                        </div>
                    </div>
                    : false
                }                

                <div className="notes">
                    <h4>Notes</h4>
                    <textarea disabled={textareaDisabled} onChange={(e) => setNotes(e.target.value)} value={ notes === null ? "" : notes}></textarea>
                </div>                          

                <div className="entry-details-buttons right">
                    {/* Button change dynamically based on options, choices and data */}
                    { !textareaDisabled ? <input onClick={() => changeNotes(entry, notes, setTextareaDisabled, setResponse)} className="btn btn-success" value="Submit Changes" readOnly/>: false}
                    { !textareaDisabled ? <input onClick={() => discardChange()} className="btn btn-danger" value="Discard Changes" readOnly/>: false}
                    { textareaDisabled ? <input onClick={() => setTextareaDisabled(!textareaDisabled)} className="btn btn-primary" value="Edit Notes" readOnly />: false}
                    <input onClick={() => changeArchiveEntry(entry, isArchived, setIsArchived, setResponse)} className="btn btn-warning" value={isArchived ? "Unarchive Entry" : "Archive Entry" } readOnly/> 
                </div>  
            </div>
            </>
        );
    }
}
export default EntryDetail;
  
