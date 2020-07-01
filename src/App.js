import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import SearchList from './components/SearchList.js';
import StaticMap from './components/StaticMap.js';
import Directions from './components/Directions.js';
import Main from './Main';

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
      middleLocation: [],
      range: 10000,
      directionsArr: false,
    }
  }


  async getQueries(location, query) {
    //  Pass lat/long from (Geocode Address API) here ↓ , in (Place Search API)
    try {
      // Retrieve coordinates data (lat, long) + await for a promise to be resolved
      const { data: { results: [{ locations: [{ latLng: { lat, lng } }] }] } } = await axios({
        url: `https://www.mapquestapi.com/geocoding/v1/address`,
        method: "GET",
        responseType: "json",
        params: {
          key: API_KEY,
          location: location,
        },
      })

      // Retrieve query results + await for a promise to be resolved
      const { data: { results } } = await axios({
        url: `https://www.mapquestapi.com//search/v4/place`,
        method: "GET",
        responseType: "json",
        params: {
          // Passing long, lat from  (Get Geocode Address API see below) to check the response
          circle: `${lng}, ${lat}, ${this.state.range}`,
          pageSize: 20,
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

  // function to map through the queryList array and to convert to a string
  // as well, use the method includes() to determine if the value of the index passing matches with what is stored in middleLocation
  // if the current index is in highlighted locations, appending a special marker if so
  // '||' is mapquest api's way of a comma to separate addresses
  searchResultsArray = () => {
    const locationMarkers = this.state.queryList.map((item, index) => {
      return item.displayString + (this.state.middleLocation.includes(index) ? "|marker-red" : "");
    }).join("||");

    return locationMarkers;
  }

  // function to find the median of the query list array
  // if odd, return one number
  // else, return two numbers (even)
  // it will be stored into the variable "highlightMedian" which will be stored in the state "middleLocation"
  findMiddle = () => {
    let median = Math.floor((this.state.queryList.length - 1) / 2);
    let highlightMedian = [];

    if (this.state.queryList.length % 2) {
      highlightMedian = [median];
    } else {
      highlightMedian = [median, median + 1];
    }
    this.setState({
      middleLocation: highlightMedian,
    })
  }

  // Handle button click
  handleClick = async (e, location, query) => {
    e.preventDefault();

    await this.getQueries(location, query);
    // when user inputs location and query
    // have the map to render the user location and query list with markers
    try {
      // calls the function findMiddle()
      this.findMiddle();

      const mapData = await axios({
        method: 'GET',
        url: 'https://www.mapquestapi.com/staticmap/v5/map',
        responseType: 'blob',
        params: {
          key: `tZVntk8rKYnj1VeUAi4cTD6mGHgEoP15`,
          scalebar: 'true|bottom',
          // passes the user current location and the query list addresses
          locations: this.state.location + this.searchResultsArray(),
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
          url: "https://www.mapquestapi.com/directions/v2/route",
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
            directionsArr: true,
            searchResults: false,
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
                        <SearchList query={this.state.queryList} median={this.state.middleLocation}
                          onClick={this.destinationClick} />
                          : <p></p>
                    }
                    {
                      this.destinationClick ?
                        <Directions directionsArray={this.state.directions} />
                        : <p></p>
                    }                
                  </div>
                  <div className="col-50">
                    {this.state.mapImageData ? <img className="query-image" src={this.state.mapImageData} alt="map" /> : <img className="query-image" src={require ("./components/assets/map.jpg")} alt="anothermap" />}
                  </div>
                </div>
                <div className="col-50">
                  {this.state.mapImageData ? <img className="query-image" src={this.state.mapImageData} alt="map" /> : <img className="query-image" src={require("./components/assets/map.jpg")} alt="anothermap" />}
                </div>
              </div>
              <Directions directionsArray={this.state.directions} />
            </Main>
          </div>
        </div>
    );
  }
}

export default App;