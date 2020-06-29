import React, { Component } from 'react';
import axios from 'axios';

class StaticMap extends Component {
  constructor() {
    super();

    this.state = {
      mapImageData: '',
    }
  }


  // async componentDidMount() {
  //   try {
  //         const mapData = await axios({
  //           method: 'GET',
  //           url: 'https://www.mapquestapi.com/staticmap/v5/map',
  //           responseType: 'blob',
  //           params: {
  //             key: `tZVntk8rKYnj1VeUAi4cTD6mGHgEoP15`,
  //             scalebar: 'true|bottom',
  //           //   start: `Toronto, ON`,
  //           //   end: `Windsor, ON`,
  //             locations: `43.6532,-79.3832||42.3149,-83.0364`,
  //           //   shape: `radius:10km|Toronto, ON`,
  //             size: '600,600'
  //           }
  //         })
          
  //         this.setState({
  //           mapImageData : URL.createObjectURL(mapData.data),
  //         })
  //         //console.log (this.state.mapImageData)


  //       } catch (error) {
  //           console.log(`Axios ruquest is failed ${error}`);
  //       }
        
  // }

  render() {
    return (
      <div>
        <img src={this.props.mapImageData} alt=''/>
      </div>
    );
  }
}
export default StaticMap;