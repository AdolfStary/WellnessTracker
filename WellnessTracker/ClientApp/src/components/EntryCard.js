import React from 'react';
import { Link } from 'react-router-dom';


const EntryCard = (props) => {

    return (
    <Link to="/EntryDetail" /*onClick={pass ID or object to session storage so I can use it on EntryDetail}*/>
        <div className={`entry-card ${props.entry.categoryID}`}>

            <div className={`category ${props.entry.categoryID}`}>{props.entry.categoryID}</div>

            <div className={`status ${props.entry.statusID}`}>{props.entry.statusID}</div>

            <div className="time">{props.entry.time}</div>

            { 
                // If person is a diabetic and they measured blood glucose or took insulin - show diabetic data
                (sessionStorage.getItem('isDiabetic') === "true" && (props.entry.bg !== 0 || props.entry.insulin !== 0)) ?
                <div className="diabetes">
                    <div className="bg">{props.entry.bg}</div>
                    <div className="insulin">{props.entry.insulin}</div>
                </div>
                : false
            }
            
            {
                // If entry was a meal, show nutrition
                (props.entry.categoryID === "-1") ? 
                    <div className="meal">
                        <div className="fats">{props.entry.fats}</div>
                        <div className="carbs">{props.entry.carbs}</div>
                        <div className="protein">{props.entry.protein}</div>                        
                    </div> 
                    : false
            }

        </div>
        </Link>
    );
}
export default EntryCard;
  
