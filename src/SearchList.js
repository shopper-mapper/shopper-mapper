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
                this.props.query.map (umie => {
                    return (
                    <button key={umie.id}
                    id={umie.id}
                    value ={umie.displayString}
                    onClick={this.searchResult}>{umie.displayString}</button>
                    )
                })
                : <p>No results!</p>
            }
            </div>
        )
    }
}

export default SearchList;