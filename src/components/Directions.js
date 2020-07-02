import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

class Directions extends Component {

  render() {
    const { directionsArray, handleBackButton } = this.props;

    return (
      <div>
        {
          directionsArray.map(direction => {
            return (
              <ol key={direction.index}>
                <li>{direction.narrative}</li>
              </ol>
            )
          })
        }
        <button onClick={handleBackButton} className="button directions-back-btn">
          <FontAwesomeIcon className="back-icon" icon={faChevronCircleLeft} />
        </button>
      </div>
    )
  }

}

export default Directions;