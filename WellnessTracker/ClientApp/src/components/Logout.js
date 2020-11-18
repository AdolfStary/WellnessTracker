import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {PopUp} from './PopUp';
import axios from 'axios';

const Login = () => {

    sessionStorage.clear();
    window.location = "/";

    return true;

}
export default Login;
