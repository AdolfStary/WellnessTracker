import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/entry-card.css';
import { isDiabetic } from '../utility/operations';


const EntryCard = ({entry, categories, statuses}) => {

    const [data, setData] = useState({});
    
    let time = new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "numeric"
        }).format(new Date(entry.time));

    let date = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        }).format(new Date(entry.time));

    const assignClickedEntry = () => {
        sessionStorage.setItem('entry', JSON.stringify(entry));
        sessionStorage.setItem('entryStatic', JSON.stringify(data));
    }

    const initialData = () => {
        let categoryName, statusName, isPositive;

        for (let item of categories){
            if (item.id === entry.categoryID)
                categoryName = item.name;
        }

        for (let item of statuses){
            if (item.id === entry.statusID)
            {
                statusName = item.name;
                isPositive = item.isPositive;
            }
        }

        setData(
            {
                category: categoryName,
                status: statusName,
                isPositive: isPositive
            }
        );
    }

    // Loads initial data
    useEffect(initialData,[]);

    return (        
        <Link to="/EntryDetail" className="entry-card-link" onClick={assignClickedEntry}>
            <div className={`entry-card ${data.category}`}>

                <div className={`card-head ${data.category} ${data.isPositive}`}>
                    {data.category}
                    <div className="time">{date} - {time}</div>
                    <div className={`status`}>{data.status}</div>
                </div>
                <div className="card-body">                
                    {
                        // If entry was a meal, show nutrition
                        (data.category === "Meal") &&
                            <div className="meal">
                                <div className="fats">F: {entry.fats}g</div>
                                <div className="carbs">C: {entry.carbs}g</div>
                                <div className="protein">P: {entry.protein}g</div>                        
                            </div>
                    }
                    {
                        // If entry was a meal, show nutrition
                        (data.category === "Exercise") && 
                            <div className="exercise">
                                <div>{entry.exerciseLength !== 0 ? entry.exerciseLength+"m" : "N/A"}</div>                      
                            </div>
                    }
                    { 
                        // If person is a diabetic and they measured blood glucose or took insulin - show diabetic data
                        (isDiabetic() && (entry.bg !== 0 || entry.insulin !== 0)) &&
                        <div className="diabetes">
                            <div className="bg">BG: {entry.bg}</div>
                            <div className="insulin">Dose: {entry.insulin}u</div>
                        </div>
                    }
                </div>
            </div>
        </Link>
    );
}
export default EntryCard;
  
