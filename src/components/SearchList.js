import React, { Component } from 'react';

class SearchList extends Component {

    searchResult = (e) => {
        const address = e.currentTarget.value;
        this.props.onClick(address);
    }
    
    render() {
        return (
          <div>
            {
              this.props.query.length > 0 ?
                this.props.query.map(results => {
                    return (
                      < button className="query-btn" key={results.id}
                        id={results.id}
                        value={results.displayString}
                        onClick={this.searchResult} > {results.displayString}</ button>
                    )
                  }
                })
                : <p>No results!</p>
            }
          </div >
        )
    }
}

export default SearchList;