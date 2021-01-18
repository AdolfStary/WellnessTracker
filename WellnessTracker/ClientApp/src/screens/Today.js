import React, {useState, useEffect} from 'react';
import {getToday} from '../utility/api-calls';
import MealToday from '../components/MealToday';
import DiabetesToday from '../components/DiabtetesToday';
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
        }, []
    );
    

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
export default Today;
  
