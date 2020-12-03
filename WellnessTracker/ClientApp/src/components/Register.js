import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { PopUp } from './PopUp';


const Register = () => {
    const [response, setResponse] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDiabetic, setIsDiabetic] = useState(false);
    const [confirmTerm, setConfirmTerm] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        let userID = uuid();
        let encodedPassword = username + password;

        if (confirmTerm){
            axios(
                {
                    method: 'post',
                    url: 'API/Register',
                    params: {
                        id: userID,
                        username: username,
                        password:  encodedPassword,
                        isDiabetic: isDiabetic
                    }
                }
            ).then((res) => {
                setResponse(res.data);
                if (res.data === "Success!") window.location = "/Login";
            }
            ).catch((err) => {
                setResponse(err.response.data);
            });
        }
        else setResponse("You need to read and understand the disclaimer before proceeding.");

    }

    

    return (
            <>
                <h2>Register</h2>            
                {response !== "" ? <PopUp message={response} /> : ""}
                <div id="register">
                    <form onSubmit={e => handleSubmit(e)}>
                        <label htmlFor='username'>Username: </label>
                        <input id='username' name='username' type='text' onChange={(e) => setUsername(e.target.value)} value={username} required />
                        <label htmlFor='password'>Password: </label>
                        <input id='password' name='password' type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                        <div className="diabetes-checkbox">
                            <label htmlFor='isDiabetic'>Include diabetes data: </label>
                            <input id='isDiabetic' name='isDiabetic' type='checkbox' onChange={(e) => setIsDiabetic(!isDiabetic)} value={isDiabetic} />
                        </div>
                        <div className="disclaimer">
                            <label htmlFor='confirm-term'>This app was designed solely as an aid for personal wellness tracking. It is not intended or recommended to be used for making any diet or medical decisions. Always consult your medical practitioner or dietitian when making any decisions related to your health or diet, always use tools provided by your diabetes team or medical equipment supplier to keep track of your diabetes related data. By checking this box, you confirm that you have read and understand this disclaimer:</label>
                            <input id='confirm-term' name='confirm-term' type='checkbox' onChange={(e) => setConfirmTerm(!confirmTerm)} value={confirmTerm} />
                            <strong></strong>
                        </div>
                        <input type='submit' value='Register' className='btn btn-primary' />
                    </form>
                </div>
            </>
        );
    

}

export default Register;
