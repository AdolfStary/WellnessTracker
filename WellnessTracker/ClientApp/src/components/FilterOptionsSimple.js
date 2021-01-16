import React from 'react';

const FilterOptionsSimple = ({setTimeframe, setShowArchived, handleSubmit, showArchived, timeframe}) => {
    
    return(
        <React.Fragment>
            <h4>Filter options</h4>
            <form onSubmit={handleSubmit}>                    
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
                    <label htmlFor='showArchived'>Include Archived: </label>
                    <input id='showArchived' name='showArchvied' type='checkbox' onChange={() => setShowArchived(!showArchived)} value={showArchived} />
                </div>

                <input type="submit" className="btn btn-primary" value="Filter" />
            </form>
        </React.Fragment>
    );
}
export default FilterOptionsSimple;