import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";



class Header extends Component {

    constructor() {
        super();

        this.state = {
            userInputlocation: '',
            userInputQuery: '',
            // disabled: false,
        }
    }

    handleChangeLocation = (e) => {
        console.log(e.target.value);
        this.setState({
            userInputlocation: e.target.value,
        })
    }

    handleChangeQuery = (e) => {
        this.setState({
            userInputQuery: e.target.value,
        })
    }

    // geoLocation = () => {
    //      this.props.getUserLocation().then(response => console.log("DONE"));
    //         this.setState({
    //             disabled: true,
    //             userInputlocation: this.props.geoAddress,
    //         }, () => 
    //         console.log(this.props.geoAddress)
    //         );
    // }

    render() {
        return (
            <header className="header">
                <form className="row" action="">
                    <div className="header-search col-auto">
                        <div>
                            <label className="sr-only" htmlFor="searchLocation">Enter location:</label>
                            <input className="input input-location" onChange={this.handleChangeLocation}
                             type="text" name="searchLocation" id="searchLocation" placeholder="Your location" />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="searchQuery">Enter query:</label>
                            <input className="input input-query" onChange={this.handleChangeQuery} type="text" name="searchQuery" id="searchQuery" placeholder="Your query" />
                        </div>
                        {/* THIS IS THE CHECKBOX FOR USING CURRENT USER LOCATION */}
                        <div>
                            <label className="checkbox" htmlFor="currentLocation">
                                <input type="checkbox" name="currentLocation" id="currentLocation" onChange={this.props.getUserLocation} />
                            </label>
                        </div>
                    </div>

                    <div className="col-auto header-search-btn">
                        <button className="button" onClick={(event) => this.props.handleClick(event, this.state.userInputlocation, this.state.userInputQuery,)} type='submit'><FontAwesomeIcon className="search-icon" icon={faSearch}/></button>
                    </div>
                </form>
            </header>
        )
    }
}

export default Header;