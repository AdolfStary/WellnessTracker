import React from 'react';

// Method to display possible relation between allergens consumed within 3 hrs prior to negative feeling entries
const displaySickData = (sicknessData) => {
    let totalCases;
    const arrayResponse = Object.entries(sicknessData);
    for(let item of arrayResponse){
        if (item[0] === "AllergenMeal"){
            totalCases = item[1];
            delete arrayResponse[arrayResponse.indexOf(item)];
        }

    }
    arrayResponse.sort((a,b) => b[1] - a[1]);

    return(
        arrayResponse.map( (item) => <li key={item[0]} className={(item[1]/totalCases*100).toFixed(0) > 50 ? "high" : "mid"}><strong>{item[0]}</strong> in <strong>{(item[1]/totalCases*100).toFixed(0)}%</strong> of cases</li>)
    );
}

export {displaySickData};