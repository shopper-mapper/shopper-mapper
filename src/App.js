import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
// import MapSearch from './MapSearch';
import Header from './Form';
import SearchList from './SearchList.js';
import StaticMap from './StaticMap.js';
import Directions from './Directions.js';

const API_KEY = 'tZVntk8rKYnj1VeUAi4cTD6mGHgEoP15';

class App extends Component {

  constructor() {
    super();

    this.state = {
      queryList: [],
      searchResults: false,
      destination: '',
      directions: [],
      mapImageData: '',
    }
  }

  async componentDidMount() {

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
        searchResults: true,
        location,
        // coordinates: `${lng}, ${lat}`,
      })

      // Handle error if promise is rejected
    } catch (error) {
      console.log(`Axios request is failed ${error}`);
    }
  }


  // Handle button click
  handleClick = async (e, location, query) => {
    e.preventDefault();

    await this.getQueries(location, query);
  }

  // handles the directions when user clicks a destination
  destinationClick = (toAddress) => {
    this.setState({
      destination: toAddress,
    }, () => {
      console.log(this.state.location);
      console.log(this.state.destination);

      try {
        axios({
          url: "http://www.mapquestapi.com/directions/v2/route",
          method: "GET",
          responseType: "json",
          params: {
            key: API_KEY,
            from: this.state.location,
            to: this.state.destination,
          }
        }).then((response) => {
          response = response.data.route.legs[0].maneuvers

          this.setState({
            directions: response,
          })
          console.log(this.state.directions);
        })

      } catch (e) {
        console.log(e);
      }
    })
  }

  render() {
    return (
      <Fragment>
        <div className="wrapper">
          <div className="container">


            <h1 className="title">Shopper - Mapper</h1>
            <Header handleClick={this.handleClick} />

            {
              this.state.searchResults ?
                <SearchList query={this.state.queryList}
                  onClick={this.destinationClick} />
                : <div />
            }

            <Directions directionsArray={this.state.directions} />

            <StaticMap mapImageData={this.state.mapImageData} />
            {/* <MapSearch queryList={this.state.queryList || []} coordinates={this.state.coordinates} /> */}
            {/* <FontAwesomeIcon icon={faGlobeAmericas} size="2x" /> */}
            {/* <FontAwesomeIcon icon={faLinkedin} size="2x" /> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
