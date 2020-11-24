import React from 'react';


const EntryDetail = (props) => {

    let entry; 
    let time; 
    let date;  

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
        /*date = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(entry.time);

        time = new Intl.DateTimeFormat("en-GB", {
            hour: "numeric",
            minute: "numeric"
            }).format(entry.time);*/



        return (
            <div className={`entry-card ${entry.entryCategory.name}`}>

                <div className={`category ${entry.entryCategory.name}`}><strong>Category:</strong> {entry.entryCategory.name}</div>

                <div className={`status ${entry.entryStatus.name}`}><strong>Mood:</strong> {entry.entryStatus.name}</div>

                <div className="time"><strong>Date entered:</strong> {entry.time}</div>

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
                    (entry.entryCategory.name == "Meal") ? 
                        <div className="meal">
                            <h4>Nutrition</h4>
                            <div className="fats">{entry.fats}</div>
                            <div className="carbs">{entry.carbs}</div>
                            <div className="protein">{entry.protein}</div>                        
                        </div> 
                        : false
                }
                
                {
                    // If there are no entry notes, hide this
                    (entry.notes !== null && entry.notes !== "" ? <div className="notes"><h4>Notes:</h4> {entry.notes}</div> : false)
                }
                

            </div>
        );
    }
}
export default EntryDetail;
  
