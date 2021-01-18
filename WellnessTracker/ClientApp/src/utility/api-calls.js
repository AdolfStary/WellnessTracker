import axios from 'axios';

const registerUser = async (setResponse, userID, username, encodedPassword, isDiabetic) => {
    axios(
        {
            method: 'post',
            url: 'API/Register',
            params: {
                id: userID,
                username: username,
                password:  encodedPassword,
                isDiabetic: isDiabetic
            }
        }
    ).then((res) => {
        setResponse(res.data);
        if (res.data === "Success!") window.location = "/Login";
    }
    ).catch((err) => {
        setResponse(err.response.data);
    });
}

const validateUser = async (setUsername, setPassword, setResponse, username, concatPassword) => {
    axios(
        {
            method: 'get',
            url: 'API/Validate',
            params: {
                username: username,
                password:  concatPassword
            }
        }
    ).then((res) => {
        sessionStorage.setItem('user', res.data[1]);
        sessionStorage.setItem('isDiabetic', res.data[2]);                

        setResponse(res.data[0]);
        setUsername("");
        setPassword("");
        window.location = '/';
    }
    ).catch((err) => {
        setResponse(err.response.data);
    });
}

const submitEntry = (category, status, time, carbs, protein, fats, notes, insulin, bg, allergen1, allergen2, allergen3, exerciseLength, setResponse) => {
    axios(
        {
            method: 'post',
            url: 'API/MakeEntry',
            params: {
                categoryID: category,
                userID: sessionStorage.getItem('user'),
                statusID: status,
                time: time,
                carbs: carbs,
                protein: protein,
                fats: fats,
                notes: notes,
                insulin: insulin,
                bg: bg,
                allergen1: allergen1,
                allergen2: allergen2,
                allergen3: allergen3,
                exerciseLength: exerciseLength
            }
        }
    ).then((res) => {     
        setResponse(res.data);
        if (res.data === "Success!"){
            window.location = "/MakeEntry";
        }
    }
    ).catch((err) => {
        setResponse(err.response.data);
    });
}

const changeNotes = async (entry, notes, setTextareaDisabled, setResponse) => {
    axios(
        {
            method: 'patch',
            url: 'API/ChangeNotes',
            params: {
                id: entry.id,
                notes: notes
            }
        }
    ).then((res) => {     
        entry.notes = notes;
        sessionStorage['entry'] = JSON.stringify(entry);
        setTextareaDisabled(true);
        setResponse(res.data);

    }).catch((err) => {
        setResponse(err.response.data);
    });
}

// Gets alergens for this entry, if there are any.
const loadAllergens = async (entry, setAllergens, setResponse) => {
    axios(
        {
            method: 'get',
            url: 'API/GetEntryAllergens',
            params: {
                userID: sessionStorage.getItem('user'),
                entryID: entry.id
            }
        }
    ).then((res) => {            
        setAllergens(res.data);
    }).catch((err) => {
        setResponse(err.response.data);
    });;
}

const changeArchiveEntry = async (entry, isArchived, setIsArchived, setResponse) => {
    axios(
        {
            method: 'patch',
            url: 'API/ChangeArchived',
            params: {
                id: entry.id
            }
        }
    ).then((res) => {     
        setIsArchived(!isArchived);
        entry.isArchived = !isArchived;
        sessionStorage['entry'] = JSON.stringify(entry);
        setResponse(res.data);

    }).catch((err) => {
        setResponse(err.response.data);
    });;
}

const getCategories = async (diabetes = false) => {
    const categories = await axios(
        {
            method: 'get',
            url: 'API/GetCategories',
            params: {diabetic: diabetes}
        }
    ).then((res) => {    
        return res.data;        
    });
    return categories;
}

const getStatuses = async () => {
    const statuses = await axios(
        {
            method: 'get',
            url: 'API/GetStatuses'
        }
    ).then((res) => {     
        return res.data;
    });
    return statuses;
}

const getAllergens = async () => {
    const allergens = await axios(
        {
            method: 'get',
            url: 'API/GetAllergens'
        }
    ).then((res) => {
        return res.data;
    });
    return allergens;
}

// Gets today's entries
const getToday = async () => {
    const data = await axios(
        {
            method: 'get',
            url: 'API/GetEntries',
            params: {
                userID: sessionStorage.getItem('user'),
                category: "0",
                status: "0",
                timeframe: "0",
                notesText: "",
                showArchived: false
            }
        });
    return data.data;
}

const getFilteredEntries = async (timeframe, showArchived) => {

    const data = axios(
        {
            method: 'get',
            url: 'API/GetEntries',
            params: {
                userID: sessionStorage.getItem('user'),
                category: 0,
                status: 0,
                timeframe: timeframe,
                notesText: "",
                showArchived: showArchived
            }
        }
    ).then((res) => {
        return res;               
    });

    return data;
}

const getEntries = async (category, status, timeframe, notesText, showArchived, setResponse) => {
    const data = await axios(
        {
            method: 'get',
            url: 'API/GetEntries',
            params: {
                userID: sessionStorage.getItem('user'),
                category: category,
                status: status,
                timeframe: timeframe,
                notesText: notesText,
                showArchived: showArchived
            }
        }
    ).then((res) => {      
        setResponse("Success!");      
        return res;               
    }
    ).catch((err) => {
        setResponse(err.response.data);
    });
    return data.data;
}

const getNegativeStatusAllergens = async (timeframe, showArchived) => {
    const data = axios(
        {
            method: 'get',
            url: 'API/GetNegativeStatusAllergens',
            params: {
                userID: sessionStorage.getItem('user'),
                timeframe: timeframe,
                showArchived: showArchived
            }
        }
    ).then((res) => {
        return res;
    });

    return data;
}



export {
    getToday, 
    getFilteredEntries, 
    getNegativeStatusAllergens, 
    registerUser, 
    validateUser, 
    changeNotes, 
    loadAllergens, 
    changeArchiveEntry, 
    getCategories, 
    getStatuses, 
    getEntries, 
    getAllergens, 
    submitEntry
};