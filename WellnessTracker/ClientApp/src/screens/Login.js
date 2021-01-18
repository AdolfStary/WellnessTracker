import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {PopUp} from '../components/PopUp';
import {validateUser} from '../utility/api-calls';
import '../css/login.css';

const Login = () => {
    
    const [response, setResponse] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Validates user
    const handleSubmit = (event) => {
        event.preventDefault();

        validateUser(setUsername, setPassword, setResponse, username, password);        
    }
    
    return (
        <>
        <h2>Login</h2>
        {response !== "" && <PopUp message={response} />}
        <div id="login">  
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input id='username' name='username' type='text' onChange={(e) => setUsername(e.target.value)} value={username} required />
                <label htmlFor='password'>Password: </label>
                <input id='password' name='password' type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                <input type='submit' value='Login' className='btn btn-primary'/>
            </form>
            <p>Don't have an account? <Link to='/Register'> Register here </Link></p>
        </div>
        </>
    );
}

export default Login;
