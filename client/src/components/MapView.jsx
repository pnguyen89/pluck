import React from 'react';
import axios from 'axios';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import config from '../../../config';
import dl from './detect_location.js';

let map;
let directions;
mapboxgl.accessToken = config.pubKey;

const dotenv = require('dotenv').config();

const Map = ReactMapboxGl({
  accessToken: config.pubKey,
});

class MapView extends React.Component {
  constructor(props) {
    super(props);
    // create state that is set to the plant's adress
    this.state = {
      // address: [],
      userLoc: '',
      plantLoc: '',
    };
    this.getAddress = this.getAddress.bind(this);
  }

  componentDidMount() {
    // add destination property to directions? to render map with plant's address as destination
    this.setState = {
      userLoc: dl.getUserLoc(),
    };
    const { userLoc } = this.state;
    console.log(userLoc);
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: userLoc,
      zoom: 3,
    });
    directions = new MapboxDirections({
      accessToken: config.key,
      unit: 'metric',
      profile: 'mapbox/walking',
    });
    map.addControl(directions, 'top-left');
    directions.setOrigin([-90.069800, 29.972890]);
    directions.setDestination('522 Montegut Street');
    this.getAddress();
  }

  getAddress() {
    axios.get('/health')
      .then((res) => {
        console.log(res);
        const plant = res.data;
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
