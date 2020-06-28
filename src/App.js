import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Directions from './Directions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
// import MapSearch from './MapSearch';
import Form from './Form';

const API_KEY = 'Hdn9np3DNC4CEF81G8GN9WHr1dR7985c';

class App extends Component {

  constructor() {
    super();

    this.state = {
      queryList: [],
    }
  }


  async getQueries(location, query) {
    //  Pass lat/long from (Geocode Address API) here ↓ , in (Place Search API)
    try {
      // Retrieve coordinates data (lat, long) + await for a promise to be resolved
      const { data: { results: [{ locations: [{ latLng: { lat, lng } }] }] } } = await axios({
        url: `http://www.mapquestapi.com/geocoding/v1/address`,
        method: "GET",
        responseType: "json",
        params: {
          key: API_KEY,
          location: location,
        },
      })

      // Retrieve query results + await for a promise to be resolved
      const { data: { results } } = await axios({
        url: `http://www.mapquestapi.com//search/v4/place`,
        method: "GET",
        responseType: "json",
        params: {
          // Passing long, lat from  (Get Geocode Address API see below) to check the response
          location: `${lng}, ${lat}`,
          key: API_KEY,
          sort: "relevance",
          q: query,
        },
      })

      // Update state with the results data from an API call
      this.setState({
        queryList: results,
        // coordinates: `${lng}, ${lat}`,
      })

      // Handle error if promise is rejected
    } catch (error) {
      console.log(`Axios ruquest is failed ${error}`);
    }
  }


  // Handle button click
  handleClick = async (e, location, query) => {
    e.preventDefault();

    await this.getQueries(location, query);
  }


  render() {
    return (
      <div className="container">
        <h1 className="title">Shopper - Mapper</h1>

        <Form handleClick={this.handleClick} />
        <Directions />


        {/* <MapSearch queryList={this.state.queryList || []} coordinates={this.state.coordinates} /> */}
        <FontAwesomeIcon icon={faGlobeAmericas} size="2x" />
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </div>
    );
  }
}

export default App;
