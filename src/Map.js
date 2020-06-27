import "leaflet/dist/leaflet.css";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import React, { Component, Fragment } from "react";



export default class MapSearch extends Component {
constructor() {
    super();

    this.state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }
}
  
//   markers = [{
//     position: [],
//     title: “”,
//     description: “”
//   }]


//   handleDestinationClick = (endLocation) => {
//     const {currentLocation} = this.props;
//     // Api call to get destination
//   }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Fragment>
      <Map center={position} zoom={this.state.zoom} style={{width: "100%",height: "400px"}}>
        <TileLayer
          attribution="&amp;copy <a href=“http://osm.org/copyright”>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {this.markers.map((item) => (<Marker position={item.position}>
          <Popup>
            <h2>{item.title}</h2>
            {item.description} */}
            {/* <Button onClick={()  => handleDestinationClick(item.position)}>Destination</Button> */}
          {/* </Popup>
        </Marker>))} */}
      </Map>
      {/* <Dierections>
        dsad’asldpasl
        dsadasdasd
        dsadasdasddas
      </Dierections> */}
      </Fragment>
    )
  }
}