import React from 'react';
import axios from 'axios';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import config from '../../../config'
import mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';


var map;
var directions;
mapboxgl.accessToken = config.pubKey

const dotenv = require('dotenv').config();  

const Map = ReactMapboxGl({
    accessToken: config.pubKey
});

class MapView extends React.Component {
  constructor(props) {
    super(props);
    // create state that is set to the plant's adress
    this.state = {
        address: []
    }
    this.getAddress = this.getAddress.bind(this);
}

  componentDidMount() {
    // add destination property to directions? to render map with plant's address as destination
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-98.5795, 39.8283],
      zoom: 3,
    });
    directions = new MapboxDirections({
      accessToken: config.key,
      unit: 'metric',
      profile: 'mapbox/walking',
    });
    map.addControl(directions, 'top-left');
    directions.setOrigin([-90.069800, 29.972890]);
    directions.setDestination('1560 North Rocheblave Street');
    this.getAddress();
}

  getAddress() {
    axios.get('/allplants')
      .then((res) => {
        console.log(res);
        const plant = res.data[0];
        this.setState({ address: plant.address });
      });
  }


  render() {
    return (
      <div>
        <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.js'></script>
        <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.css' type='text/css' />
        <div id="map" style={{ width: 600, height: 500, marginLeft: 'auto', marginRight: 'auto'}}/>
      </div>
    );
  }
}

export default MapView;
