import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Directions from './Directions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import MapSearch from './Map';
import Form from './Form';

class App extends Component {

  constructor() {
    super();

    this.state = {
      queryList: [],
      // Comes from input
      userLocation: '',
      // Comes from input
      userQuery: '',
      // Comes from API call
      coordinates: '',

    }
  }


  async getQueries() {
    //  Pass lat/long from (Geocode Address API) here ↓ , in (Place Search API)
    try {
      // Retrieve query results + await for a promise to be resolved
      const { data: { results } } = await axios({
        url: `http://www.mapquestapi.com//search/v4/place`,
        method: "GET",
        responseType: "json",
        params: {
          // Passing long, lat from  (Get Geocode Address API see below) to check the response
          // location: "-79.381713, 43.651893",
          location: this.state.coordinates,
          key: "RSBH9KbMvmkRzdRkD8Joil8TqbXW3HvB",
          sort: "relevance",
          // By default is museum, we'll interpolate user input instead
          // Passing value from input
          q: this.state.userQuery,
        }
      })

      console.log(results);

      // Update state with the results data from an API call
      this.setState({
        queryList: results,
      })

      // Handle error if promise is rejected
    } catch (error) {
      console.log(`Axios ruquest is failed ${error}`);
    }

    // Get Geocode Address ( longtitude, latitude) based on user input
    try {
      // Retrieve coordinates data (lat, long) + await for a promise to be resolved
      const { data: { results: [{ locations: [{ latLng: { lat, lng } }] }] } } = await axios({
        url: `http://www.mapquestapi.com/geocoding/v1/address`,
        method: "GET",
        responseType: "json",
        params: {
          key: "RSBH9KbMvmkRzdRkD8Joil8TqbXW3HvB",
          // Default value, insted we'll interpolate user input
          // Passing value from input
          // location: 'Toronto, ON',
          location: this.state.userLocation, 
        }
      })

      this.setState({
        coordinates: `${lng}, ${lat}`,
      })

      console.log(lat, lng); // lat long

      // Handle error if promise is rejected
    } catch (error) {
      console.log(`Axios ruquest is failed ${error}`);
    }
  }


  handleClick = async (e, location, query) => {
    e.preventDefault();

    await this.getQueries();

    this.setState({
      userLocation: location,
      userQuery: query,
    })

    console.log(this.state.userLocation);

  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Shopper - Mapper</h1>

        <Form handleClick={this.handleClick} />
        <Directions />


        <MapSearch />
        <FontAwesomeIcon icon={faGlobeAmericas} size="2x" />
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </div>
    );
  }
}

export default App;
