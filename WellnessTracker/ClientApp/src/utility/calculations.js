// Calculates avergage blood glucose
const avgBG = (entryList) => {
    let total = 0, count = 0;
    let result;

    for(let item of entryList){
        if(item.bg !== 0){
            total += item.bg;
            count++;
        }
    }
    result = count > 0 ? (total / count).toFixed(2) : "N/A";

    return result;
}

// Calculates average insulin dose
const avgInsulin = (listToday) => {
    let total = 0, count = 0;
    let result;

    for(let item of listToday){
        if(item.insulin !== 0){
            total += item.insulin;
            count++;
        }
    }
    result = count > 0 ? (total / count).toFixed(2)+"u" : "N/A";

    return result;
}

// Calculates total insulin taken today
const totalInsulin = (listToday) => {
    let total = 0;

    for(let item of listToday){
        total += item.insulin;
    }

    return total > 0 ? total+"u" : "N/A";
}

const totalFats = (listToday) => {
    let total = 0;

    for(let item of listToday){
        total += item.fats;
    }

    return total > 0 ? total+"g" : "N/A";
}

const totalCarbs = (listToday) => {
    let total = 0;

    for(let item of listToday){
        total += item.carbs;
    }

    return total > 0 ? total+"g" : "N/A";
}

const totalProtein = (listToday) => {
    let total = 0;

    for(let item of listToday){
        total += item.protein;
    }

    return total > 0 ? total+"g" : "N/A";
}

const totalMeals = (listToday) => {
    let total = 0;

    for(let item of listToday){
        if (item.categoryID === -5){
            total++;
        }
    }
    return total;
}

// Gets total exercise length for today
const totalExercise = (listToday) => {
    let total = 0;

    for(let item of listToday){
        if (item.categoryID === -4){
            total += item.exerciseLength;
        }
    }
    return total+"m";
}

// Calculates Average daily insulin
const avgDailyInsulin = (entryList) => {
    let dailyTotal = 0;
    let lastDate = "";
    let dailyTotals = [];
    let superTotal = 0;

    for(let item of entryList){
        
        if(item.insulin !== 0){

            if(lastDate === null) lastDate = new Date(item.time).getDate();

            if (new Date(item.time).getDate() === lastDate){
                dailyTotal += item.insulin;                   
            }
            else {
                dailyTotals.push(dailyTotal);                  
                lastDate = new Date(item.time).getDate();
                dailyTotal = 0;
                dailyTotal += item.insulin;
            }
        } 
    }

    if (dailyTotal !== 0){
        dailyTotals.push(dailyTotal);
    }

    for(let total of dailyTotals){
        superTotal += total;
    }

    return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(2)+"u" : "N/A";
}

const avgDailyFats = (entryList) => {
    let dailyTotal = 0;
    let lastDate = "";
    let dailyTotals = [];
    let superTotal = 0;    
    
    for(let item of entryList){
        
        if(lastDate === null) lastDate = new Date(item.time).getDate();

        if (new Date(item.time).getDate() === lastDate){
            dailyTotal += item.fats;                   
        }
        else {
            dailyTotals.push(dailyTotal);                  
            lastDate = new Date(item.time).getDate();
            dailyTotal = 0;
            dailyTotal += item.fats;
        }
        if (entryList.indexOf(item) === entryList.length-1)
            dailyTotals.push(dailyTotal);                
    }

    for(let total of dailyTotals){
        superTotal += total;
    }

    return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(0)+"g" : "N/A";
}

const avgDailyCarbs = (entryList) => {
    let dailyTotal = 0;
    let lastDate = "";
    let dailyTotals = [];
    let superTotal = 0;    
    
    for(let item of entryList){
        
        if(lastDate === null) lastDate = new Date(item.time).getDate();

        if (new Date(item.time).getDate() === lastDate){
            dailyTotal += item.carbs;                   
        }
        else {
            dailyTotals.push(dailyTotal);                  
            lastDate = new Date(item.time).getDate();
            dailyTotal = 0;
            dailyTotal += item.carbs;
        }
        if (entryList.indexOf(item) === entryList.length-1)
            dailyTotals.push(dailyTotal);                
    }

    for(let total of dailyTotals){
        superTotal += total;
    }

    return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(0)+"g" : "N/A";
}

const avgDailyProtein = (entryList) => {
    let dailyTotal = 0;
    let lastDate = "";
    let dailyTotals = [];
    let superTotal = 0;    
    
    for(let item of entryList){
        
        if(lastDate === null) lastDate = new Date(item.time).getDate();

        if (new Date(item.time).getDate() === lastDate){
            dailyTotal += item.protein;                   
        }
        else {
            dailyTotals.push(dailyTotal);                  
            lastDate = new Date(item.time).getDate();
            dailyTotal = 0;
            dailyTotal += item.protein;
        }
        if (entryList.indexOf(item) === entryList.length-1)
            dailyTotals.push(dailyTotal);             
    }

    for(let total of dailyTotals){
        superTotal += total;
    }

    return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(0)+"g" : "N/A";
}

// Calculates average daily meals per day, includes days where user skipped meals to give accurate data
const avgDailyMeals = (entryList) => {
    let dailyTotal = 0;
    let lastDate = "";
    let dailyTotals = [];
    let superTotal = 0;

    
    for(let item of entryList){
        
        if(lastDate === null) lastDate = new Date(item.time).getDate();

        if (new Date(item.time).getDate() === lastDate){
            if (item.categoryID === -5)
                dailyTotal++;                   
        }
        else {
            dailyTotals.push(dailyTotal);                  
            lastDate = new Date(item.time).getDate();
            dailyTotal = 0;
            if (item.categoryID === -5)
                dailyTotal++; 
        }
        if (entryList.indexOf(item) === entryList.length-1)
            dailyTotals.push(dailyTotal);             
    }

    for(let total of dailyTotals){
        superTotal += total;
    }
    return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(1) : "N/A";
}

// Calculates average daily workout time, in case of multiple workouts through day, excludes days that are not workout days. 
// Working out daily is not beneficial so lower average due to resting days is counter productive
const avgDailyExercise = (entryList) => {
    let dailyTotal = 0;
    let lastDate = "";
    let dailyTotals = [];
    let superTotal = 0;

    for(let item of entryList){
        
        if(item.exerciseLength !== 0){

            if(lastDate === null) lastDate = new Date(item.time).getDate();

            if (new Date(item.time).getDate() === lastDate){
                dailyTotal += item.exerciseLength;                   
            }
            else {
                dailyTotals.push(dailyTotal);                  
                lastDate = new Date(item.time).getDate();
                dailyTotal = 0;
                dailyTotal += item.exerciseLength;
            }
        } 
    }

    if (dailyTotal !== 0){
        dailyTotals.push(dailyTotal);
    }

    for(let total of dailyTotals){
        superTotal += total;
    }

    return dailyTotals.length > 0 ? (superTotal/(dailyTotals.length-1)).toFixed(0)+"m" : "N/A";
}

export {avgBG, avgInsulin, 
        totalInsulin, totalFats, 
        totalCarbs, totalProtein, 
        totalMeals, totalExercise, 
        avgDailyInsulin, avgDailyFats,
        avgDailyCarbs, avgDailyProtein, 
        avgDailyMeals, avgDailyExercise
};