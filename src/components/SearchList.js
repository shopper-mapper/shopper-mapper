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
                  if (results === this.props.findMiddle) {
                    console.log('Yes');
                    return (
                      < button className="query-btn" key={results.id}
                        id={results.id}
                        value={results.displayString}
                        onClick={this.searchResult} > {results.displayString}</ button>
                    )
                  } else {
                    console.log('No');
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