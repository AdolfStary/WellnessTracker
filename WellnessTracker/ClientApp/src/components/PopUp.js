import React from 'react';

// Displays response message with color coding
const PopUp = ({message}) => {
    if (message.includes("Success")){
        return (
            <div className="alert alert-success">
                {message}
            </div>
        );
    }
    else{
        return (
            <div className="alert alert-danger">
                {message}
            </div>
        );
    }
}
export {PopUp}
  
