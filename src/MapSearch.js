import React, { Component, Fragment } from "react";
import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});



class MapSearch extends Component {
  
    render() {

        const { coordinates } = this.props;
        return (
            <Fragment>
                <Map
                    // Center position 
                    center={coordinates}
                    style={{ width: "100%", height: "400px" }}>
                    <TileLayer
                        attribution="&amp;copy <a href=“http://osm.org/copyright”>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.props.queryList.map((item) => {
                        return (
                            <Marker key={item.id} position={item.place.geometry.coordinates}>
                                <Popup>
                                    <h2>{item.name}</h2>
                                    <p>{item.properties}</p>
                                </Popup>
                            </Marker>
                        )
                    })}
                </Map>
            </Fragment>
        )
    }
}

export default MapSearch;
