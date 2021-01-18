import React, { useEffect, useState } from 'react';
import {PopUp} from '../components/PopUp';
import {getCategories, getStatuses, getAllergens, submitEntry} from '../utility/api-calls';
import '../css/make-entry.css';

const MakeEntry = () => {
    
    const [response, setResponse] = useState("");
    const [listOfCategories, setListOfCategories] = useState([]);
    const [listOfStatuses, setListOfStatuses] = useState([]);
    const [listOfAllergens, setListOfAllergens] = useState([]);

    const now = new Date();
    // Got heavily inspired at : https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time
    // Had to modify to make it work for my own use. 
    // I got heavily inspired as I didn't know how to more simplify the code to achieve same result.
    // Method suggests creating new date, setting time straight according to timezone and then assigning as value to
    // Datetime-local input by converting it to ISOString.
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setMilliseconds(0);

    const [category, setCategory] = useState("-5");
    const [status, setStatus] = useState("-10");
    const [time, setTime] = useState(now.toISOString().slice(0, -1));
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fats, setFats] = useState(0);
    const [notes, setNotes] = useState("");
    const [insulin, setInsulin] = useState(0);
    const [bg, setBG] = useState(0);
    const [allergen1, setAllergen1] = useState("0");
    const [allergen2, setAllergen2] = useState("0");
    const [allergen3, setAllergen3] = useState("0");
    const [exerciseLength, setExerciseLength] = useState("0");

    // Runs when loaded once to load Categories and Statuses
    useEffect(() =>{

        const loadStaticData = async () => {
            const categories = sessionStorage.getItem('isDiabetic') === "true" ? await getCategories(true) : getCategories();
            const statuses = await getStatuses();
            const allergens = await getAllergens();
            setListOfCategories(categories); 
            setListOfStatuses(statuses);
            setListOfAllergens(allergens);
        }

        loadStaticData();
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();

        submitEntry(category, status, time, carbs, protein, fats, notes, insulin, bg, allergen1, allergen2, allergen3, exerciseLength, setResponse);       
    }

    return (
        <div id="entryform">
            <h2>Make an entry</h2>

            {response !== "" ? <PopUp message={response} /> : ""}
            
            <form onSubmit={handleSubmit}>
                <div className="main-section">
                    <div>
                        <label htmlFor='category'>Category: </label>
                        <select name='category' id='category' onChange={(e) => setCategory(e.target.value)} value={category}>
                            {
                                listOfCategories.map( (categoryItem) => <option key={categoryItem.id} value={categoryItem.id}>{categoryItem.name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor='status'>Mood: </label>
                        <select name='status' id='status' onChange={(e) => setStatus(e.target.value)} value={status}>
                            {
                                listOfStatuses.map( (statusItem) => <option key={statusItem.id} value={statusItem.id}>{statusItem.name}</option>)
                            }
                        </select>
                    </div>                        
                    <div>
                        <label htmlFor='time'>Time: </label>
                        <input id='time' name='time' type='datetime-local' onChange={(e) => setTime(e.target.value)} value={time} required />
                    </div>
                </div>

                {
                    // If the selected category is "Meal", show meal entry options
                    (category === "-5") ? 
                    <div className="main-section">
                        <div className="nutrition">
                            <div>
                                <label htmlFor='carbs'>Carbs: </label>
                                <input id='carbs' name='carbs' type='number' onChange={(e) => setCarbs(e.target.value)} value={carbs} />
                            </div>
                            <div>
                                <label htmlFor='protein'>Protein: </label>
                                <input id='protein' name='protein' type='number' onChange={(e) => setProtein(e.target.value)} value={protein} />
                            </div>
                            <div>
                                <label htmlFor='fats'>Fats: </label>
                                <input id='fats' name='fats' type='number' onChange={(e) => setFats(e.target.value)} value={fats} />
                            </div>
                        </div>
                        <div className="allergens">
                            <div>
                                <label htmlFor='allergen1'>Allergen 1: </label>
                                <select name='allergen1' id='allergen1' onChange={(e) => setAllergen1(e.target.value)}>
                                    <option value="0">N/A</option>
                                    {
                                        listOfAllergens.map( (allergenItem) => <option key={allergenItem.id} value={allergenItem.id}>{allergenItem.name}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor='allergen2'>Allergen 2: </label>
                                <select name='allergen2' id='allergen2' onChange={(e) => setAllergen2(e.target.value)}>
                                    <option value="0">N/A</option>
                                    {
                                        listOfAllergens.map( (allergenItem) => <option key={allergenItem.id} value={allergenItem.id}>{allergenItem.name}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor='allergen3'>Allergen 3: </label>
                                <select name='allergen3' id='allergen3' onChange={(e) => setAllergen3(e.target.value)}>
                                    <option value="0">N/A</option>
                                    {
                                        listOfAllergens.map( (allergenItem) => <option key={allergenItem.id} value={allergenItem.id}>{allergenItem.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    : false
                }

                {
                    // If Category is "Exercise" show exercise entry options
                    (category === "-4") ?
                    <div className="main-section exercise">
                        <label htmlFor='exerciseLength'>Length of exercies (minutes): </label>
                        <input id='exerciseLength' name='exerciseLength' type='number' onChange={(e) => setExerciseLength(e.target.value)} value={exerciseLength} />
                    </div>
                    : false
                }
                
                
                
                {
                    // If user is diabetic show diabetes options
                    (sessionStorage.getItem('isDiabetic') === "true") ?
                        <div className="main-section">
                            <div>
                                <label htmlFor='bg'>Blood Glucose: </label>
                                <input id='bg' name='bg' type='number' onChange={(e) => setBG(e.target.value)} value={bg} />
                            </div>
                            <div>
                                <label htmlFor='insulin'>Insulin: </label>
                                <input id='insulin' name='insulin' type='number' onChange={(e) => setInsulin(e.target.value)} value={insulin} />
                            </div>
                        </div>
                        : false
                }

                <div className="notes main-section">
                    <label htmlFor='notes'>Notes: </label>
                    <textarea id='notes' name='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
                </div>

                <input type='submit' className="btn btn-primary" value='Make Entry' />
            </form>
        </div>
    );
}
export default MakeEntry;
