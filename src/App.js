import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import SearchList from './components/SearchList.js';
import Directions from './components/Directions.js';
import Main from './components/Main';
import swal from 'sweetalert';



const API_KEY = 'PQuhe1x2GJtKUcw1AALSvsrA0WEwMCcT';

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
      loading: false,
    }
  }

  //Make an axios request
  async getQueries(location, query) {
    // Show loading message 
    this.setState({
      loading: true,
    })
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

      // Retrieve query results
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
        loading: false,
      })
      // Handle error if promise is rejected
    } catch (error) {
      swal("Error has occurred!", `${error}`);
    }
  }

  searchResultsArray = () => {
    const locationMarkers = this.state.queryList.map((item, index) => {
      return item.displayString + (this.state.middleLocation.includes(index) ? "|marker-green" : "");
    }).join("||");

    return locationMarkers;
  }

  // Find middle item in an array
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

  // On click get user inputs, pass it to the getQueries function
  handleClick = async (e, location, query) => {
    e.preventDefault();

    await this.getQueries(location, query);

    try {
      this.findMiddle();

      const mapData = await axios({
        method: 'GET',
        url: 'https://www.mapquestapi.com/staticmap/v5/map',
        responseType: 'blob',
        params: {
          key: API_KEY,
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
      swal("Error has occurred!", `${error}`);
    }
  }

  // Handle the directions when user clicks a destination
  destinationClick = (toAddress) => {
    this.setState({
      destination: toAddress,
      loading: true,
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
            loading: false,
          })
        })
        // when user clicks on a destination button, it will render the map from the api call to show the route
        axios({
          method: 'GET',
          url: 'https://www.mapquestapi.com/staticmap/v5/map',
          responseType: 'blob',
          params: {
            key: API_KEY,
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
        swal("Error has occurred!", `${error}`);
      }
    })
  }


  // Update state
  handleBackButton = (e) => {
    e.preventDefault();
    // show search results and hide directions arr
    this.setState({
      directionsArr: false,
      searchResults: true,
    })
  }


  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="col-80">
            <Header
              handleClick={this.handleClick}
            />
            <Main>
              <div className="row">
                <div className="search-list col-50">
                  {
                    !this.state.queryList.length > 0
                      ? <p className="main-intro">Welcome to Shopper Mapper - for when you want to go somewhere average.
                      Enter your location and what you’re looking for (e.g. museum, restaurant, cafe) and we’ll list options within 10km, highlighting what’s not too good, not too bad, but right in the middle.</p>
                      : null}
                  {
                    this.state.loading
                      ? <p className="main-loading">Loading...</p>
                      : null
                  }
                  {
                    this.state.searchResults ?
                      <SearchList
                        query={this.state.queryList}
                        median={this.state.middleLocation}
                        onClick={this.destinationClick} />
                      : null
                  }
                  {
                    this.state.directionsArr
                      ? <Directions handleBackButton={this.handleBackButton} directionsArray={this.state.directions} />
                      : null
                  }
                </div>
                <div className="col-50">
                  {this.state.mapImageData
                    ? <img className="query-image" src={this.state.mapImageData} alt="map" />
                    : <img className="query-image" src={require("./components/assets/map.jpg")} alt="anothermap" />}
                </div>
              </div>
            </Main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;