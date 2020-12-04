import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const EntryCard = (props) => {

    const [data, setData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    let time = new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "numeric"
        }).format(new Date(props.entry.time));

    let date = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        }).format(new Date(props.entry.time));

    const assignClickedEntry = () => {
        sessionStorage.setItem('entry', JSON.stringify(props.entry));
        sessionStorage.setItem('entryStatic', JSON.stringify(data));
    }

    const initialData = () => {
        let categoryName, statusName, isPositive;

        for (let item of props.categories){
            if (item.id === props.entry.categoryID)
                categoryName = item.name;
        }

        for (let item of props.statuses){
            if (item.id === props.entry.statusID)
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
        setDataLoaded(true);
    }

    // Loads initial data
    if (!dataLoaded) initialData();

    return (        
        <Link to="/EntryDetail" className="entry-card-link" onClick={() => assignClickedEntry()}>
            <div className={`entry-card ${data.category}`}>

                <div className={`card-head ${data.category} ${data.isPositive}`}>
                    {data.category}
                    <div className="time">{date} - {time}</div>
                    <div className={`status`}>{data.status}</div>
                </div>
                <div className="card-body">                
                    {
                        // If entry was a meal, show nutrition
                        (data.category === "Meal") ? 
                            <div className="meal">
                                <div className="fats">F: {props.entry.fats}g</div>
                                <div className="carbs">C: {props.entry.carbs}g</div>
                                <div className="protein">P: {props.entry.protein}g</div>                        
                            </div>
                            : false
                    }
                    {
                        // If entry was a meal, show nutrition
                        (data.category === "Exercise") ? 
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
  
