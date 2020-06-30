import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import SearchList from './components/SearchList.js';
import StaticMap from './components/StaticMap.js';
import Directions from './components/Directions.js';
import Main from './Main';
import map from './assets/map.jpg'

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
      location: '',
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
        searchResults: true,
        location,
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
    // when user inputs location and query
    // have the map to render the user location and query list with markers
    try {
      const mapData = await axios({
        method: 'GET',
        url: 'https://www.mapquestapi.com/staticmap/v5/map',
        responseType: 'blob',
        params: {
          key: `tZVntk8rKYnj1VeUAi4cTD6mGHgEoP15`,
          scalebar: 'true|bottom',
          // passes the user current location and the query list addresses
          // this can be obtained by grabbing the displayString that holds the address
          // replace ${this.state.queryList[0].displayString} with the function call above
          locations: `${this.state.location} || ${this.state.queryList[0].displayString}`,
          shape: `radius:10km|${this.state.location}`,
          size: '600,600'
        }
      })

      this.setState({
        mapImageData: URL.createObjectURL(mapData.data),
      })
    } catch (error) {
      console.log(`Axios request is failed ${error}`);
    }
  }

  // handles the directions when user clicks a destination
  destinationClick = (toAddress) => {
    this.setState({
      destination: toAddress,
    }, () => {
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
        })// when user clicks on a destination button, it will render the map from the api call to show the route
        axios({
          method: 'GET',
          url: 'https://www.mapquestapi.com/staticmap/v5/map',
          responseType: 'blob',
          params: {
            key: `tZVntk8rKYnj1VeUAi4cTD6mGHgEoP15`,
            scalebar: 'true|bottom',
            start: this.state.location,
            end: this.state.destination,
            size: '600,600'
          }
        }).then((response) => {
          this.setState({
            mapImageData: URL.createObjectURL(response.data),
          })
        })
      } catch (error) {
        console.log(`Axios request is failed ${error}`);
      }
    })
  }


  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="col-80">
            <Header handleClick={this.handleClick} />
            <Main>
              <div className="row">
                <div className="search-list col-50">
                  {
                    this.state.searchResults ?
                      <SearchList query={this.state.queryList}
                        onClick={this.destinationClick} />
                      : <p>Loading...</p>
                  }
                </div>
                <div className="col-50">
                  {this.state.mapImageData ? <img className="query-image" src={this.state.mapImageData} alt="map" /> : <img className="query-image" src={map} alt="anothermap" />}
                </div>
              </div>
              <Directions directionsArray={this.state.directions} />
            </Main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;