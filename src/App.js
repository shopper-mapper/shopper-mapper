import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
// import MapSearch from './MapSearch';
import Form from './Form';
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
        // coordinates: `${lng}, ${lat}`,
      })

      // Handle error if promise is rejected
    } catch (error) {
      console.log(`Axios request is failed ${error}`);
    }
  }

  // function to map through the queryList array *Someone fix please
  // searchResultsArray = () => {
  //   // return this.state.queryList

  //   let searchResults = this.state.queryList.map( => {

  //   })

  // }

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
      console.log(this.state.queryList);
      // console.log(this.state.queryList.displayString);
      
      this.setState({
        mapImageData : URL.createObjectURL(mapData.data),
      })
      //console.log (this.state.mapImageData)


    } catch (error) {
        console.log(`Axios request is failed ${error}`);
    }
  }
  
  // handles the directions when user clicks a destination
  destinationClick = (toAddress) => {
    this.setState({
      destination: toAddress,
    }, () => {
    console.log (this.state.location);
    console.log (this.state.destination);

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
        }).then( (response) => {
          this.setState({
            mapImageData: URL.createObjectURL(response.data),
            
          })
          console.log(response.data)
        })      
    } catch (e){
      console.log(e);
    }
  })
}

  render() {
    return (
      <div className="container">
        <h1 className="title">Shopper - Mapper</h1>

        <Form handleClick={this.handleClick} />

        {
          this.state.searchResults ?
        <SearchList query={this.state.queryList}
        onClick={this.destinationClick}/>
        : <div/>
        }

        <Directions directionsArray={this.state.directions}/>

        {/* <StaticMap/> */}
        <img src={this.state.mapImageData} />
        {/* <MapSearch queryList={this.state.queryList || []} coordinates={this.state.coordinates} /> */}
        <FontAwesomeIcon icon={faGlobeAmericas} size="2x" />
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </div>
    );
  }
}

export default App;