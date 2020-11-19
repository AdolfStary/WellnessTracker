import React from 'react';
import { Link } from 'react-router-dom';


const EntryCard = (props) => {

    return (
    <Link to="/EntryDetail" onClick={/*pass ID or object to session storage so I can use it on EntryDetail*/}>
        <div className={`entry-card ${props.category.name}`}>

            <div className={`category ${props.category.name}`}>{props.category.name}</div>

            <div className={`status ${props.status.name}`}>{props.status.name}</div>

            <div className="time">{props.time}</div>

            { 
                // If person is a diabetic and they measured blood glucose or took insulin - show diabetic data
                (sessionStorage.getItem('isDiabetic') === "true" && (props.bg !== 0 || props.insulin !== 0)) ?
                <div className="diabetes">
                    <div className="bg">{props.bg}</div>
                    <div className="insulin">{props.insulin}</div>
                </div>
                : false
            }
            
            {
                // If entry was a meal, show nutrition
                (props.category.name == "Meal") ? 
                    <div className="meal">
                        <div className="fats">{props.fats}</div>
                        <div className="carbs">{props.carbs}</div>
                        <div className="protein">{props.protein}</div>                        
                    </div> 
                    : false
            }

        </div>
        </Link>
    );
}
export {EntryCard}
  
