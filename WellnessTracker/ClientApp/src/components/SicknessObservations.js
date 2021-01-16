import React from 'react';
import {displaySickData} from '../utility/operations';

const SicknessObservations = ({sicknessData}) => {

    return(
        <div className="sick-data">
        <ul>
            <li className="neutral">Did you know, you were not feeling well within 3 hours after eating these foods?</li>
            {sicknessData !== null ? displaySickData(sicknessData) : "No data that could give insight was detected."}
        </ul>
        </div>
    );

}
export default SicknessObservations;