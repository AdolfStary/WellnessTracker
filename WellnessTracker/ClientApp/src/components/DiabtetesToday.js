import React from 'react';
import {avgBG, avgInsulin, avgDailyInsulin} from '../utility/calculations';
import {isDiabetic} from '../utility/operations';

const DiabetesToday = ({entryList}) => {

    return(
        <React.Fragment>
        {   
            isDiabetic() &&
            <div className="today-diabetes">
                <table>
                    <thead>
                        <tr>
                            <th className="today-diabetes-bg">Avg. BG</th>
                            <th className="today-diabetes-avginsulin">Avg. insulin dose</th>
                            <th className="today-diabetes-totinsulin">Avg. daily meal insulin</th>                                       
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="today-diabetes-bg">{avgBG(entryList)}</td>
                            <td className="today-diabetes-avginsulin">{avgInsulin(entryList)}</td>
                            <td className="today-diabetes-totinsulin">{avgDailyInsulin(entryList)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        }   
        </React.Fragment>
    );
}
export default DiabetesToday;