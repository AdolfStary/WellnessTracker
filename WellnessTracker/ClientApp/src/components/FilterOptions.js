import React from 'react';


const FilterOptions = (handleSubmit, setTimeframe, setCategory, setStatus, setNotesText, setShowArchived, timeframe, showArchived, notesText, listOfCategories, listOfStatuses) => {

    return(
        <form onSubmit={() => handleSubmit()}>

            <div>
                <label htmlFor='timeframe'>Time: </label>
                <select id='timeframe' name='timeframe'onChange={(e) => setTimeframe(e.target.value)} value={timeframe}>
                    <option value="-1">To date</option>
                    <option value="0">Today</option>
                    <option value="7">Past week</option>
                    <option value="14">Past 2 weeks</option>
                    <option value="30">Past 30 days</option>
                    <option value="90">Past 90 days</option>
                    <option value="180">Past 180 days</option>
                </select>
            </div>

            <div>
                <label htmlFor='category'>Category: </label>
                <select name='category' defaultValue='0' id='category' onChange={(e) => setCategory(e.target.value)}>
                    <option value="0">All</option>
                    {
                       (listOfCategories !== undefined) ? listOfCategories.map( (categoryItem) => <option key={categoryItem.id} value={categoryItem.id}>{categoryItem.name}</option>)
                        : false
                    }
                </select>
            </div>

            <div>
                <label htmlFor='status'>Mood: </label>
                <select name='status' defaultValue='0' id='status' onChange={(e) => setStatus(e.target.value)}>
                    <option value="0">All</option>
                    {
                       (listOfStatuses !== undefined) ? listOfStatuses.map( (statusItem) => <option key={statusItem.id} value={statusItem.id}>{statusItem.name}</option>)
                        : false
                    }
                </select>
            </div>

            <div>
                <label htmlFor='notesText'>Text in notes: </label>
                <input id='notesText' name='notesText' type='text' onChange={(e) => setNotesText(e.target.value)} value={notesText} />
            </div>

            <div>
                <label htmlFor='showArchived'>Show Archived: </label>
                <input id='showArchived' name='showArchvied' type='checkbox' onChange={(e) => setShowArchived(!showArchived)} value={showArchived} />
            </div>

            <input type="submit" className="btn btn-primary" value="Filter" />
        </form>
    );
}

export default FilterOptions;