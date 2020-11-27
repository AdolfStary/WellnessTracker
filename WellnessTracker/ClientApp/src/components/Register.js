import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { PopUp } from './PopUp';


const Register = () => {
    const [response, setResponse] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDiabetic, setIsDiabetic] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        let userID = uuid();
        let encodedPassword = username + password;

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
        }
        ).catch((err) => {
            setResponse(err.response.data);
        });
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
                        <input type='submit' value='Register' className='btn btn-primary'/>
                    </form>
                </div>
            </>
        );
    

}

export default Register;
