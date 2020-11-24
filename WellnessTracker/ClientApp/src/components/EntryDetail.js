import React, {useState} from 'react';
import axios from 'axios';

const EntryDetail = (props) => {


    const [isArchived, setIsArchived] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [textareaDisabled, setTextareaDisabled] = useState(true);
    const [notes, setNotes] = useState("No notes were entered.");

    let time, date, entry;


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
            if(res.data === "Success!"){
                setIsArchived(!isArchived);
                entry.isArchived = !isArchived;
                sessionStorage['entry'] = JSON.stringify(entry);
            }
        });
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
            if(res.data === "Success!"){
                entry.notes = notes;
                sessionStorage['entry'] = JSON.stringify(entry);
                setTextareaDisabled(true);
            }
        });
    }

    const discardChange = () => {
        setTextareaDisabled(true);
        setNotes(entry.notes);
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

        if (!dataLoaded){
            setNotes(entry.notes);
            setIsArchived(Boolean(entry.isArchived));            
            setDataLoaded(true);
        }

        date = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(entry.time));

        time = new Intl.DateTimeFormat("en-GB", {
            hour: "numeric",
            minute: "numeric"
            }).format(new Date(entry.time));




        return (
            <div className={`entry-card ${entry.entryCategory.name}`}>

                <div className={`category ${entry.entryCategory.name}`}><strong>Category:</strong> {entry.entryCategory.name}</div>

                <div className={`status ${entry.entryStatus.name}`}><strong>Mood:</strong> {entry.entryStatus.name}</div>

                <div className="time"><strong>Date entered:</strong> {date} - {time}</div>

                { 
                    // If person is a diabetic and they measured blood glucose or took insulin - show diabetic data
                    (sessionStorage.getItem('isDiabetic') === "true" && (entry.bg !== 0 || entry.insulin !== 0)) ?
                    <div className="diabetes">
                        <div className="bg"><strong>BG:</strong> {entry.bg}</div>
                        <div className="insulin"><strong>Insulin Dose:</strong> {entry.insulin}</div>
                    </div>
                    : false
                }
                
                {
                    // If entry was a meal, show nutrition
                    (entry.entryCategory.name === "Meal") ? 
                        <div className="meal">
                            <h4>Nutrition</h4>
                            <div className="fats">{entry.fats}</div>
                            <div className="carbs">{entry.carbs}</div>
                            <div className="protein">{entry.protein}</div>                        
                        </div> 
                        : false
                }
                

            <div className="notes"><h4>Notes:</h4><textarea disabled={textareaDisabled} onChange={(e) => setNotes(e.target.value)} value={notes}></textarea></div>
                           

                <div className="entry-details-buttons">
                    { !textareaDisabled ? <input onClick={() => changeNotes()} className="btn btn-success" value="Submit Changes" />: false}
                    { !textareaDisabled ? <input onClick={() => discardChange()} className="btn btn-danger" value="Discard Changes" />: false}
                    { textareaDisabled ? <input onClick={() => setTextareaDisabled(!textareaDisabled)} className="btn btn-primary" value="Edit Notes" /> : false}
                    <input onClick={() => changeArchiveEntry()} className="btn btn-warning" value={isArchived ? "Unarchive Entry" : "Archive Entry" }/> 
                </div>  
                
                
                
                

            </div>
        );
    }
}
export default EntryDetail;
  
