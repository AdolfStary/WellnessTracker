import React from 'react';
import {avgDailyFats, avgDailyCarbs, avgDailyProtein, avgDailyMeals, avgDailyExercise} from '../utility/calculations';

const MealToday = ({entryList}) => {

    return(
        <div className="today-meal">
        <table>
            <thead>
                <tr>
                    <th className="today-meal-fats">Avg Daily Fats</th>
                    <th className="today-meal-carbs">Avg Daily Carbs</th>
                    <th className="today-meal-protein">Avg Daily Protein</th>
                    <th className="today-meal-meals">Avg Daily Meals</th>
                    <th className="today-meal-exercise">Avg 'Exercise Day' length</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="today-meal-fats">{avgDailyFats(entryList)}</td>
                    <td className="today-meal-carbs">{avgDailyCarbs(entryList)}</td>
                    <td className="today-meal-protein">{avgDailyProtein(entryList)}</td>
                    <td className="today-meal-meals">{avgDailyMeals(entryList)}</td>
                    <td className="today-meal-exercise">{avgDailyExercise(entryList)}</td>
                </tr>
            </tbody>
        </table>
        </div>
    );

}
export default MealToday;