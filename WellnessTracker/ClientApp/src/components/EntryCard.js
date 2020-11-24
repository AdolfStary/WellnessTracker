import React from 'react';
import { Link } from 'react-router-dom';


const EntryCard = (props) => {

    let time = new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "numeric"
        }).format(new Date(props.entry.time));

    let date = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        }).format(new Date(props.entry.time));

    const assignClickedEntry = () => {
        sessionStorage.setItem('entry', JSON.stringify(props.entry))
    }
    return (
    <Link to="/EntryDetail" className="entry-card-link" onClick={() => assignClickedEntry()}>
        <div className={`entry-card ${props.entry.entryCategory.name}`}>

            <div className={`card-head ${props.entry.entryCategory.name}`}>{props.entry.entryCategory.name}
                <div className="time">{date} - {time}</div>
            </div>

            <div className="card-body">
                <div className={`status ${props.entry.entryStatus.name}`}>{props.entry.entryStatus.name}</div>
                { 
                    // If person is a diabetic and they measured blood glucose or took insulin - show diabetic data
                    (sessionStorage.getItem('isDiabetic') === "true" && (props.entry.bg !== 0 || props.entry.insulin !== 0)) ?
                    <div className="diabetes">
                        <div className="bg">{props.entry.bg}</div>
                        <div className="insulin">{props.entry.insulin}u</div>
                    </div>
                    : false
                }
                
                {
                    // If entry was a meal, show nutrition
                    (props.entry.entryCategory.name === "Meal") ? 
                        <div className="meal">
                            <div className="fats">F: {props.entry.fats}g</div>
                            <div className="carbs">C: {props.entry.carbs}g</div>
                            <div className="protein">P: {props.entry.protein}g</div>                        
                        </div> 
                        : false
                }
            </div>
        </div>
        </Link>
    );
}
export default EntryCard;
  
