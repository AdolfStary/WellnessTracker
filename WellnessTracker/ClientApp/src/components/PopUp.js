import React from 'react';


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
  
