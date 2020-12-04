import React from 'react';

// Displays response message with color coding
const PopUp = (props) => {
    if (props.message.includes("Success")){
        return (
            <div className="alert alert-success">
                {props.message}
            </div>
        );
    }
    else{
        return (
            <div className="alert alert-danger">
                {props.message}
            </div>
        );
    }

}
export {PopUp}
  
