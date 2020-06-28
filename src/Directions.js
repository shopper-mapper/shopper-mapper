import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

// get directions from the base location to the returned destination
// function that takes 2 location that calculates the direction from point a to b
    // values to return: "distance":  maneuvers['narrative'] 


class Directions extends Component {

  constructor() {
    super();

    this.state = {
      directions: [],
    }
  }

  componentDidMount() {
    axios({
      url: "http://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      responseType: "jsonp",
      params: {
        key: "RSBH9KbMvmkRzdRkD8Joil8TqbXW3HvB",
        from: "Royal Ontario Museum, 100 Queens Pk, TORONTO, ON M5S2C6",
        to: "Art Gallery of Ontario, 317 Dundas Street E, Toronto, ON M5T",
      }
    }).then((response) => {
      response = response.data.route.legs[0].maneuvers
      for (let i = 0; i < response.length; i++) {
        console.log(response[i].narrative)
        const directions = (response[i].narrative)
      }
      this.setState({
        // route: directions,
      })
    })
  }


  


  render() {
    return (
      <div>
        <p></p>
      </div>
    );
  }
}

export default Directions;
