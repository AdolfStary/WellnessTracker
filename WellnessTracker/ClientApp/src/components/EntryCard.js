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

            <div className={`card-head ${props.entry.entryCategory.name} ${props.entry.entryStatus.isPositive}`}>
                {props.entry.entryCategory.name}
                <div className="time">{date} - {time}</div>
                <div className={`status`}>{props.entry.entryStatus.name}</div>
            </div>

            <div className="card-body">                
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
                {
                    // If entry was a meal, show nutrition
                    (props.entry.entryCategory.name === "Exercise") ? 
                        <div className="exercise">
                            <div>{props.entry.exerciseLength !== 0 ? props.entry.exerciseLength+"m" : "N/A"}</div>                      
                        </div>
                        : false
                }
                { 
                    // If person is a diabetic and they measured blood glucose or took insulin - show diabetic data
                    (sessionStorage.getItem('isDiabetic') === "true" && (props.entry.bg !== 0 || props.entry.insulin !== 0)) ?
                    <div className="diabetes">
                        <div className="bg">BG: {props.entry.bg}</div>
                        <div className="insulin">Dose: {props.entry.insulin}u</div>
                    </div>
                    : false
                }
            </div>
        </div>
        </Link>
    );
}
export default EntryCard;
  
