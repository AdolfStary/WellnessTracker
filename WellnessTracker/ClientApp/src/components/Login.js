import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {PopUp} from './PopUp';
import axios from 'axios';

const Login = () => {
    
    const [response, setResponse] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let concatPassword = username + password;

        axios(
            {
                method: 'get',
                url: 'API/Validate',
                params: {
                    username: username,
                    password:  concatPassword
                }
            }
        ).then((res) => {
            
            if(!res.data[0].includes("Error")){
                
                sessionStorage.setItem('user', res.data[1]);
                sessionStorage.setItem('isDiabetic', res.data[2]);                

                setResponse(res.data[0]);
                setUsername("");
                setPassword("");
                window.location = '/';
            }
            else setResponse(res.data[0]);
        }
        ).catch((err) => {
            setResponse(err.response.data);
        });

        
    }

    
    return (
        <div id="login">
            <h2>Login</h2>
            {response !== "" ? <PopUp message={response} /> : ""}
            <form onSubmit={event => handleSubmit(event)}>
                <label htmlFor='username'>Username: </label>
                <input id='username' name='username' type='text' onChange={(e) => setUsername(e.target.value)} value={username} required />
                <label htmlFor='password'>Password: </label>
                <input id='password' name='password' type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                <input type='submit' value='Login' className='btn btn-primary'/>
            </form>
            Don't have an account? <Link to='/register'> Register here </Link>
        </div>
    );
    

}

export default Login;
