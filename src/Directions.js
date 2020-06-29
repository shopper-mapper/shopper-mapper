import React, { Component } from 'react';
import './App.css';

class Directions extends Component {

  render() {
    return (
      <div>
        {this.props.directionsArray.map(direction => {
          return (
            <ol key={direction.index}>
              <li>{direction.narrative}</li>
            </ol>
          )
        })}
      </div>
    )
  }

}

export default Directions;
