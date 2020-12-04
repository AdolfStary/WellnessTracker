import React, {useState} from 'react';
import axios from 'axios';
import {PopUp} from './PopUp';

const EntryDetail = (props) => {


    const [isArchived, setIsArchived] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [textareaDisabled, setTextareaDisabled] = useState(true);
    const [notes, setNotes] = useState("No notes were entered.");
    const [response, setResponse] = useState("");
    const [allergens, setAllergens] = useState([]);

    let time, date, entry, entryStatic;


    const changeArchiveEntry = () => {
        axios(
            {
                method: 'patch',
                url: 'API/ChangeArchived',
                params: {
                    id: entry.id
                }
            }
        ).then((res) => {     
            setIsArchived(!isArchived);
            entry.isArchived = !isArchived;
            sessionStorage['entry'] = JSON.stringify(entry);
            setResponse(res.data);

        }).catch((err) => {
            setResponse(err.response.data);
        });;
    }

    const changeNotes = () => {
        axios(
            {
                method: 'patch',
                url: 'API/ChangeNotes',
                params: {
                    id: entry.id,
                    notes: notes
                }
            }
        ).then((res) => {     
            entry.notes = notes;
            sessionStorage['entry'] = JSON.stringify(entry);
            setTextareaDisabled(true);
            setResponse(res.data);

        }).catch((err) => {
            setResponse(err.response.data);
        });;
    }

    const discardChange = () => {
        setTextareaDisabled(true);
        setNotes(entry.notes);
    }

    const loadAllergens = () => {
        axios(
            {
                method: 'get',
                url: 'API/GetEntryAllergens',
                params: {
                    userID: sessionStorage.getItem('user'),
                    entryID: entry.id
                }
            }
        ).then((res) => {            
            setAllergens(res.data);
        }).catch((err) => {
            setResponse(err.response.data);
        });;
    }

    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === "") {
        return (
            <p className="alert alert-danger">You do not have access to this page.</p>
        );
    }
    else if (sessionStorage.getItem('entry') === null || sessionStorage.getItem('entry') === undefined)
    {
        return (
            <p className="alert alert-danger">Entry details are not available.</p>
        );
    }
    else
    {
        entry = JSON.parse(sessionStorage.getItem('entry'));
        entryStatic = JSON.parse(sessionStorage.getItem('entryStatic'));

        if (!dataLoaded){
            setNotes(entry.notes);
            setIsArchived(Boolean(entry.isArchived));   
            loadAllergens();
            setDataLoaded(true);
        }

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
            {isArchived ? <p className="alert alert-danger right">Archived</p> : false }

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
                                    allergens.length > 0 ? allergens.map( (item) => <div key={item} className="allergen-box"><p>{item}</p></div>) : false
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
                    { !textareaDisabled ? <input onClick={() => changeNotes()} className="btn btn-success" value="Submit Changes" readOnly/>: false}
                    { !textareaDisabled ? <input onClick={() => discardChange()} className="btn btn-danger" value="Discard Changes" readOnly/>: false}
                    { textareaDisabled ? <input onClick={() => setTextareaDisabled(!textareaDisabled)} className="btn btn-primary" value="Edit Notes" readOnly />: false}
                    <input onClick={() => changeArchiveEntry()} className="btn btn-warning" value={isArchived ? "Unarchive Entry" : "Archive Entry" } readOnly/> 
                </div>  
            </div>
            </>
        );
    }
}
export default EntryDetail;
  
