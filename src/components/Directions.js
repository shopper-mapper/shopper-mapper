import React from 'react';
import DirectionIcons from './DirectionIcons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

// Populate DOM with the list of directions
const Directions = ({ directionsArray, handleBackButton }) => {
  return (
    <div className="directions-container">
      <DirectionIcons />
      {
        directionsArray.map(direction => {
          return (
            <ul key={direction.index}>
              <li className="query-item">{direction.narrative}</li>
            </ul>
          )
        })
      }
      <button
        onClick={handleBackButton}
        className="button directions-back-btn">
        <FontAwesomeIcon
          className="back-icon"
          icon={faChevronCircleLeft}
        />
      </button>
    </div>
  )
}


export default Directions;