import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";


const DirectionIcons = () => {
    return (
        <ul className="row row--center directions-list">
            <li><FontAwesomeIcon className="back-icon directions-icon" icon={faArrowUp} /></li>
            <li><FontAwesomeIcon className="back-icon directions-icon" icon={faArrowRight} /></li>
            <li><FontAwesomeIcon className="back-icon directions-icon" icon={faArrowLeft} /></li>
            <li><FontAwesomeIcon className="back-icon directions-icon" icon={faArrowDown} /></li>
        </ul>
    )
}

export default DirectionIcons;