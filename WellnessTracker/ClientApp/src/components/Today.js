import React, {useState} from 'react';
import axios from 'axios';

const Today = () => {


    const [listToday, setListToday] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const getToday = () => {
        axios(
            {
                method: 'get',
                url: 'API/GetEntries',
                params: {
                    userID: sessionStorage.getItem('user'),
                    category: "-5",
                    status: "0",
                    timeframe: "1",
                    notesText: "",
                    showArchived: false
                }
            }

        ).then((res) => {     

            setListToday(res.data);

        });
    }

    const avgBG = () => {
        let total = 0, count = 0;
        let result;

        for(let item of listToday){
            if(item.bg !== 0){
                total += item.bg;
                count++;
            }
        }

        count > 0 ? result = total / count : result = "N/A";

        return result;
    }

    const avgInsulin = () => {
        let total = 0, count = 0;
        let result;

        for(let item of listToday){
            if(item.insulin !== 0){
                total += item.insulin;
                count++;
            }
        }

        count > 0 ? result = total / count : result = "N/A";

        return result;
    }

    const totalInsulin = () => {
        let total = 0;

        for(let item of listToday){
            total += item.insulin;
        }

        return total > 0 ? total : "N/A";
    }

    const totalFats = () => {
        let total = 0;

        for(let item of listToday){
            total += item.fats;
        }

        return total > 0 ? total : "N/A";
    }

    const totalCarbs = () => {
        let total = 0;

        for(let item of listToday){
            total += item.carbs;
        }

        return total > 0 ? total : "N/A";
    }

    const totalProtein = () => {
        let total = 0;

        for(let item of listToday){
            total += item.protein;
        }

        return total > 0 ? total : "N/A";
    }

    const totalMeals = () => {
        let total = 0;

        for(let item of listToday){
            if (item.entryCategory.name === "Meal"){
                total++;
            }

        }
        return total;
    }


    if (sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === "") {
        return (
            <p className="alert alert-danger">You do not have access to this page.</p>
        );
    }
    else
    {
        if (!dataLoaded){
            getToday();
            setDataLoaded(true);
        }
        return (
            <div id="today-chart">
                <div>
                    <h2>Daily Overview</h2>
                    {   
                        (sessionStorage['isDiabetic'] === "true") ?
                        <div className="today-diabetes">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="today-diabetes-bg">Avg. BG</th>
                                        <th className="today-diabetes-avginsulin">Avg. insulin dose</th>
                                        <th className="today-diabetes-totinsulin">Total meal insulin</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="today-diabetes-bg">{avgBG()}</td>
                                        <td className="today-diabetes-avginsulin">{avgInsulin()}</td>
                                        <td className="today-diabetes-totinsulin">{totalInsulin()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        : false
                    }
                    <div className="today-meal">
                        <table>
                            <thead>
                                <tr>
                                    <th className="today-meal-fats">Total Fats</th>
                                    <th className="today-meal-carbs">Total Carbs</th>
                                    <th className="today-meal-protein">Total Protein</th>
                                    <th className="today-meal-meals">Number of meals</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="today-meal-fats">{totalFats()}</td>
                                    <td className="today-meal-carbs">{totalCarbs()}</td>
                                    <td className="today-meal-protein">{totalProtein()}</td>
                                    <td className="today-meal-meals">{totalMeals()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h2>Daily Goals</h2>
                    <div className="today-goals">

                    </div>
                </div>
            </div>
        );
    }
}
export default Today;
  
