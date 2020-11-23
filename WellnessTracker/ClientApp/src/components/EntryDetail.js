import React from 'react';


const EntryDetail = (props) => {

    let entry;
    let i = 0;
    

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

        return (
            <div className={`entry-card ${entry.entryCategory.name}`}>

                <div className={`category ${entry.entryCategory.name}`}>{entry.entryCategory.name}</div>

                <div className={`status ${entry.entryStatus.name}`}>{entry.entryStatus.name}</div>

                <div className="time">{entry.time}</div>

                { 
                    // If person is a diabetic and they measured blood glucose or took insulin - show diabetic data
                    (sessionStorage.getItem('isDiabetic') === "true" && (entry.bg !== 0 || entry.insulin !== 0)) ?
                    <div className="diabetes">
                        <div className="bg">BG: {entry.bg}</div>
                        <div className="insulin">Insulin Dose: {entry.insulin}</div>
                    </div>
                    : false
                }
                
                {
                    // If entry was a meal, show nutrition
                    (entry.entryCategory.name == "Meal") ? 
                        <div className="meal">
                            <div className="fats">{entry.fats}</div>
                            <div className="carbs">{entry.carbs}</div>
                            <div className="protein">{entry.protein}</div>                        
                        </div> 
                        : false
                }

                <div className="notes">{entry.notes}</div>
                
            </div>
        );
    }
}
export default EntryDetail;
  
