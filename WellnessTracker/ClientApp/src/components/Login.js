import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    
        return (
            <div id="login">
                <h2>Login</h2>
                <form method="POST" action="">
                    <label htmlFor='username'>Username:</label>
                    <input id='username' name='username' type='text' required />
                    <label htmlFor='password'>Password:</label>
                    <input id='password' name='password' type='text' required />
                    <input type='submit' value='Login' />
                </form>
                Don't have an account? <Link to='/register'> Register here </Link>
            </div>
        );
    

}

export default Login;
