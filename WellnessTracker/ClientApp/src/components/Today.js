import React, {useState, useEffect} from 'react';
import {getToday} from '../utility/api-calls';
import MealToday from './MealToday';
import DiabetesToday from './DiabtetesToday';
import '../css/today.css';



const Today = () => {

    const [listToday, setListToday] = useState([]);

    // Initial data load
    useEffect(() => {
        const fetchToday = async () => {
             const today = await getToday();
             setListToday(today);
        }
        fetchToday();
        }, []);
    
    // Checks if user is logged in
    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === "") {
        return (
            <p className="alert alert-danger">You do not have access to this page.</p>
        );
    }
    else
    {
        return (
            <div id="today-chart">
                <div>
                    <h2>Daily Overview</h2>
                    <DiabetesToday entryList={listToday} />
                    <MealToday entryList={listToday} />
                </div>
            </div>
        );
    }
}
export default Today;
  
