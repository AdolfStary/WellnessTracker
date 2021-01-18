import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isLoggedIn} from '../utility/operations';

/*
    theorganicbox.atlassian.net/secure/RapidBoard.jspa?rapidView=7&projectKey=RCLS2&modal=detail&selectedIssue=RCLS2-19
*/

const ProtectedRoute = ({component: Component, ...rest}) => {

    return(
    <Route {...rest} render={props => (
        isLoggedIn() ?
            <Component {...props} />
            : <Redirect to="/Login" />
    )} />
    );
}
export default ProtectedRoute;