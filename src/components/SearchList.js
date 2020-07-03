import React from 'react';

// Populate DOM with the list of searched queries
const SearchList = ({ onClick, query, median }) => {
    const searchResult = (e) => {
        const address = e.currentTarget.value;
        onClick(address);
    }

    return (
        <div>
            {
                query.length > 0 ?
                    query.map((results, index) => {
                        return (
                            <button
                                className={median.includes(index) ? "query-btn highlighted" : "query-btn"}
                                key={results.id}
                                id={results.id}
                                value={results.displayString}
                                onClick={searchResult}

                            >{results.displayString}
                            </button>
                        )
                    }
                    )
                    : <p>No results!</p>
            }
        </div >
    )
}

export default SearchList;