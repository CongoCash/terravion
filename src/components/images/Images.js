import React, { Component } from 'react';
import axios from 'axios';
import './Image.css';
import L from 'leaflet'
import DatePicker from '../date_picker/DatePicker'

class Images extends Component {
  constructor() {
    super();
    this.state = {
      userId: '5bad4dfa-7262-4a0a-b1e5-da30793cec65',
      accessToken: '2e68cee0-b2fd-4ef5-97f6-8e44afb09ffa',
      productCode: 'NC',
      epoch: [],
      coord1: 38.540580,
      coord2: -121.877271,
      dates: [],
    }

  }

  componentDidMount() {
    axios.get('https://api2.terravion.com/layers/getLayersFromBlockId?blockId=48ed28ca-d272-4d1f-bfe0-cb95b61eecbc&access_token=' + this.state.accessToken).then((response) => {
      let epoch_array = [];
      response.data.forEach((epoch) => {
        epoch_array.push(epoch.layerDateEpoch);
      });
      return epoch_array.sort();
    })
      .then((epoch_array) => {
        let dates_array = [];
        epoch_array.forEach((epoch) => {
          let convert = new Date(0);
          convert.setUTCSeconds(epoch);
          let date_string = convert.getMonth() + 1 + '/' + convert.getDate() + '/' + convert.getFullYear();
          dates_array.push(date_string);
        });
        return {dates_array: dates_array, epoch_array: epoch_array}
      })
      .then((array) => {
        this.setState({
          epoch: array.epoch_array,
          dates: array.dates_array,
        }, () => {
          this.setMap(this.state.epoch[this.state.epoch.length-1]);
        })
      })
  }

  setMap = (epochEnd) => {
    var mymap = this.map = L.map('mapid').setView([38.540580, -121.877271], 15);

    L.tileLayer("https://api.tiles.mapbox.com/v2/cgwright.ca5740e5/{z}/{x}/{y}.jpg", {
      drawControl: false,
      maxZoom: 22,
      maxNativeZoom: 19
    }).addTo(mymap);

    L.tileLayer(this.getURL(1, epochEnd), {
      attribution: 'TerrAvion',
      maxZoom: 19,
      tms: true
    }).addTo(mymap);
  };

  getURL = (epochStart, epochEnd) => {
    return ('https://api2.terravion.com/users/' + this.state.userId + '/{z}/{x}/{y}.png?epochStart=' + epochStart + '&epochEnd=' + epochEnd + '&access_token=' + this.state.accessToken + '&product=' + this.state.productCode);
  };

  setEpochEnd = (end) => {
    this.map.eachLayer((layer) => {
      if (layer._url !== "https://api.tiles.mapbox.com/v2/cgwright.ca5740e5/{z}/{x}/{y}.jpg") {
        this.map.removeLayer(layer);
      }
    });
    L.tileLayer(this.getURL(1, this.state.epoch[end]), {
      attribution: 'TerrAvion',
      maxZoom: 19,
      tms: true
    }).addTo(this.map);
  };

  render() {
    return (
      <div className="row">
        <div className="col-8">
          <div id="mapid"></div>
        </div>
        <div className="col-4 date-container">
          <DatePicker setEpochEnd={this.setEpochEnd} dates={this.state.dates}/>
        </div>
      </div>
    );
  }
}

export default Images;
